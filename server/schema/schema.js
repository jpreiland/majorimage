const graphql = require('graphql');
const Item = require('../models/item');

const 
{ 
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull 
} = graphql;


const ItemType = new GraphQLObjectType({
	name: 'Item',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString }
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		item: {
			type: ItemType,
			args: {id: { type: GraphQLID }},
			resolve(parent, args) {
				// code to get data from db/other source
				return Item.findById(args.id);
			}
		},		
		items: {
			type: GraphQLList(ItemType),
			resolve(parent, args) {
				// code to get data from db/other source
				return Item.find({});
			}
		}		
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addItem: {
			type: ItemType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				let item = new Item({
					name: args.name
				});
				return item.save();
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});