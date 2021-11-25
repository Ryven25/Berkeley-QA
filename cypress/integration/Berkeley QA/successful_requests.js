/// <reference types = "Cypress"/>
describe("Card Holder POST API tests", () => {
  Cypress.config(
    "baseUrl",
    "https://api.staging.pungle.co/api/v1/card_issuing/cardholders"
  );

  const validToken = {
    Authorization: Cypress.env("token"),
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const body_mandatory = {
    program_id: 31,
    external_tag: "abc123",
    first_name: "John",
    last_name: "Doe",
    date_of_birth: "01-01-1980",
    email: "user@fakedomain.com",
    phone: "1231231234",
    postal_code: "84121",
    city: "Moonbase One",
    state: "UT",
    address1: "123 Fake Street",
    address2: "apartment 2",
    country: "840",
    sin: "",
    shipping_method: "1",
    load_amount: 100,
  };

  it("Request with mandatory only params", () => {
    cy.request({
      method: "POST",
      url: "/",
      headers: validToken,
      body: body_mandatory,
    }).then((response) => {
      expect(response.status).equal(201);
      expect(response.body.data).to.have.property("external_tag", "abc123");
      expect(response.body.data.value_load_result.code).to.equal("success");
    });
  });
});
