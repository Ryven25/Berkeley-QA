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

  const firstName = "John";
  const lastName = "Doe";
  const dateOfBirth = "01-01-1980";
  const ProgramId = "31";

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
    body_full.first_name = "John";
    body_full.last_name = "Doe";
    body_full.date_of_birth = "01-01-1980";
  });

  it("Valid first name test", () => {
    body_full.first_name = firstName;
    body_full.last_name = lastName;
    body_full.date_of_birth = dateOfBirth;
    cy.validateSuccess(body_full, headers);
  });

  it("Invalid first name test", () => {
    body_full.first_name = "6Û &";
    cy.validateFailure(body_full, headers, "Invalid name characters");
  });

  it("Invalid last name test", () => {
    body_full.last_name = "fÛ &";
    cy.validateFailure(body_full, headers, "Invalid name characters");
  });

  it("Invalid date of birth test", () => {
    body_full.date_of_birth = "10-1980";
    body_full.date_of_birth = "01/01/1980";
    cy.validateFailure(
      body_full,
      headers,
      "Date must be in the format dd-MM-yyyy"
    );
  });

  it("Valid program id test", () => {
    body_full.program_id = ProgramId;
    cy.validateSuccess(body_full, headers);
  });

  it("Long program id test", () => {
    body_full.program_id = 6546566;
    cy.validateErrorCode(body_full, headers, "Program Not Found");
  });
});
