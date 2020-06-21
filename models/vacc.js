var mongoose = require('mongoose');
const shortid = require('shortid');


var vaccSchema = mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate
	  },
	
	info : 
		{
			hospital:{
				type:String,
				required:true
			},
			father: {
				type: String,
				required: true,
				trim: true
			},
			mother: {
				type: String,
				required: true,
				trim: true
			},
			email: {
				type: String,
				required: true,
				trim: true,
				lowercase: true
			   
			},
			DOB: {
				type: String,
				required: true
			},
			address: {
				type: String,
				required: true,
				trim: true
			},
			phone:{
				type:String,
				required:true
			},
			district : {
				type: String,
				required:true
			}
		   
		},
	hour:{
		name: {type: String, default: "Hep B D1"},
		check: {type: String, default: "False",}
	},
	week6: {
		v1:{name: {type: String, default: "Hep B D2"},
		check: {type: String, default: "False"}},
		v2:{name: {type: String, default: "DTaP D1"},
		check: {type: String, default: "False"}},
		v3:{name: {type: String, default: "Hib D1"},
		check: {type: String, default: "False"}},
		v4:{name: {type: String, default: "IPV D1"},
		check: {type: String, default: "False"}},
		v5:{name: {type: String, default: "PVC D1"},
		check: {type: String, default: "False"}}
    },
    week10: {
		v6:{name: {type: String, default: "DTwP D2"},
		check: {type: String, default: "False"}},
		v7:{name: {type: String, default: "IPV D2"},
		check: {type: String, default: "False"}},
		v8:{name: {type: String, default: "Hib D2"},
		check: {type: String, default: "False"}},
		v9:{name: {type: String, default: "Rotavirus D2"},
		check: {type: String, default: "False"}},
		v10:{name: {type: String, default: "PCV D2"},
		check: {type: String, default: "False"}}
    },
    week14: {
		v11:{name: {type: String, default: "DTwP D3"},
		check: {type: String, default: "False"}},
		v12:{name: {type: String, default: "IPV D3"},
		check: {type: String, default: "False"}},
		v13:{name: {type: String, default: "Hib D3"},
		check: {type: String, default: "False"}},
		v14:{name: {type: String, default: "Rotavirus D3"},
		check: {type: String, default: "False"}},
		v15:{name: {type: String, default: "PCV D3"},
		check: {type: String, default: "False"}}
    },
    month6: {
		v16:{name: {type: String, default: "OPV D1"},
		check: {type: String, default: "False"}},
		v17:{name: {type: String, default: "Hep B D3"},
		check: {type: String, default: "False"}}
	},
	date: {
		d1:{type: String},
		d2:{type: String},
		d3:{type: String},
		d4:{type: String},
		d5:{type: String}
		},
});

var Vacc = mongoose.model("Vacc", vaccSchema);

module.exports = Vacc ;