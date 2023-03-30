const request = require("supertest");
const app = require("./index.js");

describe("API tests", () => {
    it('Testing post request on "/login/pas"', () => { });
    it('Testing get request on "/database/janus"', () => {
        return request(app)
            .get("/database/janus")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => { 
                expect(Object.keys(response.body.day.all).length).toBeGreaterThan(1)
                expect(Object.keys(response.body.week.all).length).toBeGreaterThan(1)
                expect(Object.keys(response.body.two_weeks.all).length).toBeGreaterThan(1)
                expect(Object.keys(response.body.month.all).length).toBeGreaterThan(1)
            });
    });
    it('Testing post request on "/error/update"', () => { });
    it('Testing get request on "/error/old"', () => { });
    it('Testing get request on "/error/new"', () => { });
    it('Testing get request on "/database/janus/info"', () => { });
});
