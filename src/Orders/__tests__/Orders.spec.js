import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Orders from '../Orders';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("shoudl render order in a table line", async () => {
  const fakeOrder = {
		"id": 1,
		"code": 4059827,
		"price": 280.00,
		"date": "01/03/2020",
		"cashbackPercentage": 5,
		"cashbackAbsolute": 14.00,
		"status": 1,
		"statusText": "Aprovado"
	};
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve([fakeOrder])
    })
  );

  await act(async () => {
    render(<Orders />, container);
  });

	const comlumns = document.querySelectorAll('table tr td');
	
	expect(comlumns[0].textContent).toBe(fakeOrder.code.toString());
	expect(comlumns[1].textContent).toBe(fakeOrder.price.toString());
	expect(comlumns[2].textContent).toBe(fakeOrder.date);
	expect(parseFloat(comlumns[3].textContent)).toBe(fakeOrder.cashbackPercentage);
	expect(parseFloat(comlumns[4].textContent)).toBe(fakeOrder.cashbackAbsolute);
	expect(comlumns[5].textContent).toBe(fakeOrder.statusText);
	
	global.fetch.mockRestore();
	
});