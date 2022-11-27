import { Button, DatePicker, Space, version } from "antd";

import "./App.css";

export const App = () => {
  return (
    <div className="App">
      <h1>antd version: {version}</h1>
      <Space>
        <DatePicker />
        <Button type="primary">Primary Button</Button>
      </Space>
    </div>
  );
};
