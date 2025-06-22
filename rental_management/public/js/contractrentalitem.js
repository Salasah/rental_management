frappe.ui.form.on("Contract", "refresh", function(frm) {
	// console.log("Test !!!!!!!!!!")
    frm.fields_dict['rental_item'].grid.get_field('item_code').get_query = function(doc, cdt, cdn) {
        var child = locals[cdt][cdn];
        console.log(child);
        return {    
            filters:{
            	'can_be_rented': 1
            }
        };
    };
});

// frappe.ui.form.on('Contract', {
// 	refresh: function(frm,cdt,cdn) {
// 		if(frm.doc.status == "Active"){
// 			frm.add_custom_button(__("Rental Order"), function() {	    		
// 				frappe.new_doc("Sales Order", {
// 					"customer": frm.doc.party_name,
// 					"transaction_date": frm.doc.date,
// 					"rental_contract_id": frm.doc.name
// 				});
// 			}, __("Create"));





frappe.ui.form.on('Contract', {
	refresh: function(frm,cdt,cdn) {
		if(frm.doc.status == "Active"){
			frm.add_custom_button(__("Rental Order"), function() {	    		
				frappe.call({
					method: "rental_management.public.py.rental_item.get_child",
					args:{
						name:frm.doc.name,
						customer:frm.doc.party_name,
					},
					callback: function(r) {
						frappe.set_route('Form', 'Sales Order', r.message.name)
					}
				});
			}, __("Create"));
		}

	}	
});

