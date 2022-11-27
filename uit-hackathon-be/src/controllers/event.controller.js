const status = require("http-status");
const { reset } = require("nodemon");

const eventService = require("../services/event.service");

class EventController {
  async getAll(req, res) {
    let { country, time, sortBy, isSortByPartipant, offset = 0, page = 1, limit = 10 } = req.query;

    const events = await eventService.getAll(
      country,
      time,
      sortBy,
      isSortByPartipant,
      offset,
      page,
      limit
    );
    res.status(status.OK).json({
      events,
    });
  }

  async createComment(req, res) {
    const comment = await eventService.insertComment(req.body);
    res.status(status.OK).json({
      comment,
    });
  }

  async getAllComment(req, res) {
    const comments = await eventService.getAllComment();
    res.status(status.OK).json({
      comments,
    });
  }

  async getById(req, res) {
    const event = await eventService.getById(req.params.id);

    res.status(status.OK).json({
      event,
    });
  }

  async createEvent(req, res) {
    const event = await eventService.createEvent(req.body, req.user.email);

    res.status(status.CREATED).json({
      event,
    });
  }

  async updateEvent(req, res) {
    const status = await eventService.updateEvent(req.params.id, req.body, req.userId);

    res.status(status.OK).json({
      status,
    });
  }

  async joinEvent(req, res) {
    const statusResult = await eventService.joinEvent(req.params.id, req.user._id);
    res.status(status.OK).json({
      message: statusResult,
    });
  }

  async leftEvent(req, res) {
    const status = await eventService.leftEvent(req.params.id, req.user._id);

    res.status(status.OK).json({
      status,
    });
  }

  async insertMany(req, res) {
    const data = await eventService.insertMany(req.body);
    res.status(status.OK).json({
      data,
    });
  }
}

module.exports = new EventController();
