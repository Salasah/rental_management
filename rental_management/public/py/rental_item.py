import frappe
from frappe import _

@frappe.whitelist()
def get_child(name,customer):
	doc_get = frappe.get_doc("Contract", name)
	new_doc = frappe.new_doc("Sales Order")
	new_doc.customer = customer
	new_doc.rental_contract_id = name
	ttt = doc_get.rental_item
	for d in ttt:
		row = new_doc.append('items', {})
		row.item_code = d.item_code
		row.delivery_date = d.delivery_date
		row.qty = d.quantity
		row.rate = d.rate
	new_doc.insert()
	return new_doc