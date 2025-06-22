frappe.ui.form.on("Sales Order", "refresh", function(frm) {
	// console.log("Test !!!!!!!!!!")
    frm.fields_dict['items'].grid.get_field('item_code').get_query = function(doc, cdt, cdn) {
        var child = locals[cdt][cdn];
        console.log(child);
        return {    
            filters:{
            	'can_be_rented': 1
            }
        };
    };
});
