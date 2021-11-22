/// <reference types = "Cypress"/>
describe("Card Holder POST API tests", () => {
  Cypress.config(
    "baseUrl",
    "https://api.staging.pungle.co/api/v1/card_issuing/cardholders"
  );

  const headers = {
    Authorization: Cypress.env("token"),
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const body_first_name_missing = {
    program_id: 31,
    external_tag: "abc123",
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

  const body_last_name_missing = {
    program_id: 31,
    external_tag: "abc123",
    first_name: "John",
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

  const body_program_id_missing = {
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

  it("Missing first name param test", () => {
    cy.request({
      method: "POST",
      url: "/",
      headers: headers,
      body: body_first_name_missing,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(400);
      expect(response.body.error).to.have.property(
        "code",
        "invalid_cardholder"
      );

      expect(response.body.error.field_errors[0].position).to.include(
        "first_name"
      );
    });
  });

  it("Missing last name param test", () => {
    cy.request({
      method: "POST",
      url: "/",
      headers: headers,
      body: body_last_name_missing,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(400);
      expect(response.body.error).to.have.property(
        "code",
        "invalid_cardholder"
      );
      expect(response.body.error.field_errors[0].position).to.include(
        "last_name"
      );
    });
  });

  it("Missing program id param test", () => {
    cy.request({
      method: "POST",
      url: "/",
      headers: headers,
      body: body_program_id_missing,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(400);
      expect(response.body.error).to.have.property("code", "url_invalid");
      expect(response.body.error.message).to.equal("Url is Invalid");
    });
  });
});
