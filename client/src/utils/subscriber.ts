type callback = (data: unknown) => void;

export default class Subscribe {
  private subscribers: Record<string, callback[]> = {};

  subscribe(eventType: string, callback: callback) {
    if (!this.subscribers[eventType]) {
      this.subscribers[eventType] = [];
    }
    this.subscribers[eventType].push(callback);
    return () => {
      this.subscribers[eventType] = this.subscribers[eventType].filter(
        (cb) => cb !== callback
      );
    };
  }

  publish(eventType: string, data?: unknown) {
    if (this.subscribers[eventType]) {
      this.subscribers[eventType].forEach((callback) => callback(data));
    }
  }
}
