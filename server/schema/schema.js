const graphql = require('graphql');
const Item = require('../models/item');

const 
{ 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull 
} = graphql;


const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    isArmor: { type: GraphQLBoolean },
    isClothing: { type: GraphQLBoolean },
    isContainer: { type: GraphQLBoolean },
    isFurniture: { type: GraphQLBoolean },
    isMisc: { type: GraphQLBoolean },
    isTreasure: { type: GraphQLBoolean },
    isWriting: { type: GraphQLBoolean }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    item: {
      type: ItemType,
      args: {
          id: { type: GraphQLID },
          isClothing: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        // code to get data from db/other source
        return Item.find({isClothing: args.isClothing});
      }
    },
    itemsAnd: {
      type: GraphQLList(ItemType),
      args: {
          isArmor: { type: GraphQLBoolean },
          isClothing: { type: GraphQLBoolean },
          isContainer: { type: GraphQLBoolean },
          isFurniture: { type: GraphQLBoolean },
          isMisc: { type: GraphQLBoolean },
          isTreasure: { type: GraphQLBoolean },
          isWriting: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        // code to get data from db/other source
        let params = {};
        for (var key in args) {
          if (args.hasOwnProperty(key)) {
              params[key] = args[key];
          }
        }

        return Item.find(params);
      }
    },
    itemsOr: {
      type: GraphQLList(ItemType),
      args: {
          isArmor: { type: GraphQLBoolean },
          isClothing: { type: GraphQLBoolean },
          isContainer: { type: GraphQLBoolean },
          isFurniture: { type: GraphQLBoolean },
          isMisc: { type: GraphQLBoolean },
          isTreasure: { type: GraphQLBoolean },
          isWriting: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        // code to get data from db/other source
        let params = { $or: [] };
        for (var key in args) {
          if (args.hasOwnProperty(key)) {
            let param = {};
            param[key] = args[key];
            params.$or.push(param);
          }
        }

        return Item.find(params);
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        isArmor: { type: new GraphQLNonNull(GraphQLBoolean) },
        isClothing: { type: new GraphQLNonNull(GraphQLBoolean) },
        isContainer: { type: new GraphQLNonNull(GraphQLBoolean) },
        isFurniture: { type: new GraphQLNonNull(GraphQLBoolean) },
        isMisc: { type: new GraphQLNonNull(GraphQLBoolean) },
        isTreasure: { type: new GraphQLNonNull(GraphQLBoolean) },
        isWriting: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve(parent, args) {
        let item = new Item({
          name: args.name,
          isArmor: args.isArmor,
          isClothing: args.isClothing,
          isContainer: args.isContainer,
          isFurniture: args.isFurniture,
          isMisc: args.isMisc,
          isTreasure: args.isTreasure,
          isWriting: args.isWriting
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