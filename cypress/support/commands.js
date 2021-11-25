// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("validateSuccess", (body, headers) => {
  cy.request({
    method: "POST",
    url: "/",
    headers: headers,
    body: body,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).equal(201);
    expect(response.body.data.value_load_result.code).to.equal("success");
  });
});

Cypress.Commands.add("validateFailure", (body_full, headers, error) => {
  cy.request({
    method: "POST",
    url: "/",
    headers: headers,
    body: body_full,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).equal(400);
    expect(response.body.error.field_errors[0].message).to.equal(error);
  });
});

Cypress.Commands.add("validateErrorCode", (body_full, headers) => {
  cy.request({
    method: "POST",
    url: "/",
    headers: headers,
    body: body_full,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).equal(400);
  });
});
// Cypress.Commands.add("validateTokenCode", (body_full, headers) => {
//   cy.request({
//     method: "POST",
//     url: "/",
//     headers: headers,
//     body: body_full,
//     failOnStatusCode: false,
//   }).then((response) => {
//     expect(response.status).equal(401);
//     expect(response.body.error.field_errors[0].message).to.equal(error);
//   });
// });
