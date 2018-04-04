class MockServer
{
    constructor() {
        this.statue = 'OK';
        this.uptime = new Date().toISOString();
    }

    getStatus() {
        return this.status;
    }

    setStatus(newStatus) {
        this.status = newStatus;
        return this.status;
    }

    getUptime() {
        return this.uptime;
    }
}

module.exports = MockServer;