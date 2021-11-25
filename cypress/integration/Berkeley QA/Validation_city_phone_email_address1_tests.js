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

  const city = "Moonbase One";
  const address1 = "123 Fake Street";
  const phone = "1231231234";
  const email = "user@fakedomain.com";

  const body_full = {
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

  beforeEach(() => {
    body_full.country = "840";
    body_full.state = "UT";
    body_full.postal_code = "84121";
    body_full.phone = "1231231234";
    body_full.address1 = "123 Fake Street";
    body_full.email = "user@fakedomain.com";
  });

  it("Valid phone US - 10 digits", () => {
    body_full.phone = "1231231234";
    cy.validateSuccess(body_full, headers);
  });

  it("Valid phone Canada - 10 digits", () => {
    body_full.country = "124";
    body_full.state = "ON";
    body_full.postal_code = "A1A1A1";
    body_full.phone = "1231231234";
    cy.validateSuccess(body_full, headers);
  });

  it("Long phone US", () => {
    body_full.country = "840";
    body_full.state = "UT";
    body_full.phone = "1231231545454689674353234231234";
    body_full.postal_code = "84121";
    cy.validateFailure(
      body_full,
      headers,
      "Phone number must be a 1 to 10 digit numeric. No spaces or dashes."
    );
  });

  it("Long phone Canada", () => {
    body_full.country = "124";
    body_full.state = "ON";
    body_full.postal_code = "A1A1A1";
    body_full.phone = "12345678901238734567";
    cy.validateFailure(
      body_full,
      headers,
      "Phone number must be a 1 to 10 digit numeric. No spaces or dashes."
    );
  });

  it("Valid city, phone tests", () => {
    body_full.city = city;
    body_full.phone = phone;
    body_full.address1 = address1;
    cy.validateSuccess(body_full, headers);
  });

  it("Valid email test", () => {
    body_full.email = email;
    cy.validateSuccess(body_full, headers);
  });

  it("Invalid email test", () => {
    body_full.email = "sfasfasf";
    cy.validateErrorCode(body_full, headers);
  });

  it("Invalid city", () => {
    body_full.city = "Gæ @";
    cy.validateFailure(body_full, headers, "Invalid city characters");
  });

  it("Invalid address1", () => {
    body_full.address1 = "9æ &";
    cy.validateFailure(
      body_full,
      headers,
      "Invalid address line 1 characters or length exceeds 40 Characters"
    );
  });
});
