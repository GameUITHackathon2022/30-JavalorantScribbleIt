const createHttpError = require("http-errors");

const Event = require("../models/Event");
const Comment = require("../models/Comment");
const organization = require("../models/Organization");

const logger = require("../utils/logger");
const checkId = require("../utils/check-id");
const User = require("../models/User");
const Organization = require("../models/Organization");

class EventService {
  async getAll(country, time, sortBy = "", isSortByPartipant, offset, page, limit) {
    try {
      const queryData = {};

      if (country) {
        queryData.country = country;
      }

      if (time) {
        queryData.time = time;
      }

      const options = {};
      options.populate = { path: "organization" };
      options.sortBy = sortBy;
      options.page = +page;
      options.limit = +limit;

      let events = await Event.paginate(queryData, options);

      if (isSortByPartipant) {
        events.docs.sort((a, b) => {
          return a.participants.length > b.participants.length;
        });
      }

      return events;
    } catch (err) {
      logger.error(err, { label: "Event" });
    }
  }

  async insertComment(comment) {
    try {
      const resultComment = Comment.create(comment);
      return resultComment;
    } catch (err) {
      logger.error(err, { label: "Comment" });
    }
  }

  async getAllComment() {
    try {
      const comments = Comment.find().sort("-time").exec();
      return comments;
    } catch (err) {
      logger.error(err, { label: "Comment" });
    }
  }

  async updateEvent(id, body, email) {
    try {
      const user = await User.find({ email });

      if (!user) {
        throw createHttpError(404, "User not found");
      }

      const event = await Event.findById(id).populate("organization");

      if (!event || !event.organization.members.includes(user._id)) {
        throw createHttpError(404, "Event not found");
      }

      event = await event.updateOne(body);

      return event;
    } catch (err) {
      if (createHttpError.isHttpError(err)) {
        throw err;
      }
      logger.error(err, { label: "Event" });
    }
  }

  async createEvent(event, email) {
    try {
      const user = await User.findOne({ email }).exec();

      if (!user) {
        throw createHttpError(404, "User not found");
      }

      if (user.role != "organization_member") {
        throw createHttpError(400, "You cannot create event");
      }

      const organizationId = event.organization;

      const organization = await Organization.findById(organizationId).exec();

      if (!organization) {
        throw createHttpError(404, "Organization not found");
      }

      if (!organization.members.includes(user._id)) {
        throw createHttpError(400, "You are not a member of this organization");
      }

      organization.events.push(event._id);

      organization.save();

      const newEvent = await Event.create(event);

      return newEvent;
    } catch (err) {
      if (createHttpError.isHttpError(err)) {
        throw err;
      }
      logger.error(err, { label: "Event" });
    }
  }

  async getById(id) {
    try {
      const event = await Event.findById(id).populate("participants organization").exec();

      return event;
    } catch (err) {
      logger.error(err, { label: "Event" });
    }
  }

  async joinEvent(eventId, userId) {
    try {
      const event = await Event.findById(eventId).populate("organization").exec();
      console.log(event);
      if (!event) {
        throw createHttpError(404, "Event not found");
      }

      if (event.participants.includes(userId)) {
        throw createHttpError(400, "You already joined this event");
      }

      if (event.participants.length >= event.maxParticipants) {
        throw createHttpError(400, "Event is full");
      }
      console.log(event.participants);
      event.participants.push(userId);

      await event.save();

      return "Success";
    } catch (err) {
      if (createHttpError.isHttpError(err)) {
        throw err;
      }
      logger.error(err, { label: "Event" });
    }
  }

  async leftEvent(eventId, userId) {
    try {
      const event = await Event.findById(eventId).exec();

      if (!event) {
        throw createHttpError(404, "Event not found");
      }

      if (!event.participants.includes(userId)) {
        throw createHttpError(400, "You are not in this event");
      }

      event.participants = event.participants.filter((id) => id !== userId);

      event.save();

      return "Success";
    } catch (err) {
      if (createHttpError.isHttpError(err)) {
        throw err;
      }
      logger.error(err, { label: "Event" });
    }
  }

  async insertMany(data) {
    const result = await Event.insertMany(data);
    result.forEach(async (r) => {
      const organization = await Organization.findById(r.organization);
      organization.events.push(r._id);
      organization.save();
    });
    return result;
  }
}

module.exports = new EventService();
