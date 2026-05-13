import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Create check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const { id } = await prisma.gym.create({
      data: {
        title: "Monster Gym",
        latitude: -0.8367799,
        longitude: -52.5210662,
      },
    });
    const response = await request(app.server)
      .post(`/gyms/${id}/check-ins`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        latitude: -0.8367799,
        longitude: -52.5210662,
      });

    expect(response.statusCode).toEqual(201);
  });
});
