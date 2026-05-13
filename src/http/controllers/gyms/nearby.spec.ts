import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: "Near Gym",
        description: null,
        phone: null,
        latitude: 0.0873589,
        longitude: -51.0876417,
      });

    await request(app.server)
      .post("/gyms")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: "Far Gym",
        description: null,
        phone: null,
        latitude: -0.8367799,
        longitude: -52.5210662,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({ latitude: 0.0873589, longitude: -51.0876417 })
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: "Near Gym" }),
    ]);
  });
});
