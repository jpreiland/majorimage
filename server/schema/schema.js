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
          id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Item.findById(args.id);
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
        isArmor: { type: GraphQLBoolean },
        isClothing: { type: GraphQLBoolean },
        isContainer: { type: GraphQLBoolean },
        isFurniture: { type: GraphQLBoolean },
        isMisc: { type: GraphQLBoolean },
        isTreasure: { type: GraphQLBoolean },
        isWriting: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        let item = new Item({
          name: args.name,
          isArmor: args.isArmor ? args.isArmor : false,
          isClothing: args.isClothing ? args.isClothing : false,
          isContainer: args.isContainer ? args.isContainer : false,
          isFurniture: args.isFurniture ? args.isFurniture : false,
          isMisc: args.isMisc ? args.isMisc : false,
          isTreasure: args.isTreasure ? args.isTreasure : false,
          isWriting: args.isWriting ? args.isWriting : false
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