const graphql = require('graphql');
const Item = require('../models/item');
const Quality = require('../models/quality');
const Color = require('../models/color');
const Material = require('../models/material');

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
    isWeapon: { type: GraphQLBoolean },
    isWriting: { type: GraphQLBoolean }
  })
});

const QualityType = new GraphQLObjectType({
  name: 'Quality',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    isArmor: { type: GraphQLBoolean },
    isClothing: { type: GraphQLBoolean },
    isContainer: { type: GraphQLBoolean },
    isFurniture: { type: GraphQLBoolean },
    isMisc: { type: GraphQLBoolean },
    isTreasure: { type: GraphQLBoolean },
    isWeapon: { type: GraphQLBoolean },
    isWriting: { type: GraphQLBoolean }
  })
});

const ColorType = new GraphQLObjectType({
  name: 'Color',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    isArmor: { type: GraphQLBoolean },
    isClothing: { type: GraphQLBoolean },
    isContainer: { type: GraphQLBoolean },
    isFurniture: { type: GraphQLBoolean },
    isMisc: { type: GraphQLBoolean },
    isTreasure: { type: GraphQLBoolean },
    isWeapon: { type: GraphQLBoolean },
    isWriting: { type: GraphQLBoolean }
  })
});

const MaterialType = new GraphQLObjectType({
  name: 'Material',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    isArmor: { type: GraphQLBoolean },
    isClothing: { type: GraphQLBoolean },
    isContainer: { type: GraphQLBoolean },
    isFurniture: { type: GraphQLBoolean },
    isMisc: { type: GraphQLBoolean },
    isTreasure: { type: GraphQLBoolean },
    isWeapon: { type: GraphQLBoolean },
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
          isWeapon: { type: GraphQLBoolean },
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
    items: {
      type: GraphQLList(ItemType),
      args: {
          isArmor: { type: GraphQLBoolean },
          isClothing: { type: GraphQLBoolean },
          isContainer: { type: GraphQLBoolean },
          isFurniture: { type: GraphQLBoolean },
          isMisc: { type: GraphQLBoolean },
          isTreasure: { type: GraphQLBoolean },
          isWeapon: { type: GraphQLBoolean },
          isWriting: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        let params = { $or: [] };
        for (var key in args) {
          if (args.hasOwnProperty(key)) {
            if(args[key]) {
              let param = {};
              param[key] = args[key];
              params.$or.push(param);
            }
          }
        }

        return Item.find(params);
      }
    },
    qualities: {
      type: GraphQLList(QualityType),
      args: {
          isArmor: { type: GraphQLBoolean },
          isClothing: { type: GraphQLBoolean },
          isContainer: { type: GraphQLBoolean },
          isFurniture: { type: GraphQLBoolean },
          isMisc: { type: GraphQLBoolean },
          isTreasure: { type: GraphQLBoolean },
          isWeapon: { type: GraphQLBoolean },
          isWriting: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        let params = { $or: [] };
        for (var key in args) {
          if (args.hasOwnProperty(key)) {
            if(args[key]) {
              let param = {};
              param[key] = args[key];
              params.$or.push(param);
            }
          }
        }

        return Quality.find(params);
      }
    },
    colors: {
      type: GraphQLList(ColorType),
      args: {
          isArmor: { type: GraphQLBoolean },
          isClothing: { type: GraphQLBoolean },
          isContainer: { type: GraphQLBoolean },
          isFurniture: { type: GraphQLBoolean },
          isMisc: { type: GraphQLBoolean },
          isTreasure: { type: GraphQLBoolean },
          isWeapon: { type: GraphQLBoolean },
          isWriting: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        let params = { $or: [] };
        for (var key in args) {
          if (args.hasOwnProperty(key)) {
            if(args[key]) {
              let param = {};
              param[key] = args[key];
              params.$or.push(param);
            }
          }
        }

        return Color.find(params);
      }
    },
    materials: {
      type: GraphQLList(MaterialType),
      args: {
          isArmor: { type: GraphQLBoolean },
          isClothing: { type: GraphQLBoolean },
          isContainer: { type: GraphQLBoolean },
          isFurniture: { type: GraphQLBoolean },
          isMisc: { type: GraphQLBoolean },
          isTreasure: { type: GraphQLBoolean },
          isWeapon: { type: GraphQLBoolean },
          isWriting: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        let params = { $or: [] };
        for (var key in args) {
          if (args.hasOwnProperty(key)) {
            if(args[key]) {
              let param = {};
              param[key] = args[key];
              params.$or.push(param);
            }
          }
        }

        return Material.find(params);
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
        isWeapon: { type: GraphQLBoolean },
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
          isWeapon: args.isWeapon ? args.isWeapon : false,
          isWriting: args.isWriting ? args.isWriting : false
        });
        return item.save();
      }
    },
    addQuality: {
      type: QualityType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        isArmor: { type: GraphQLBoolean },
        isClothing: { type: GraphQLBoolean },
        isContainer: { type: GraphQLBoolean },
        isFurniture: { type: GraphQLBoolean },
        isMisc: { type: GraphQLBoolean },
        isTreasure: { type: GraphQLBoolean },
        isWeapon: { type: GraphQLBoolean },
        isWriting: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        let quality = new Quality({
          name: args.name,
          isArmor: args.isArmor ? args.isArmor : false,
          isClothing: args.isClothing ? args.isClothing : false,
          isContainer: args.isContainer ? args.isContainer : false,
          isFurniture: args.isFurniture ? args.isFurniture : false,
          isMisc: args.isMisc ? args.isMisc : false,
          isTreasure: args.isTreasure ? args.isTreasure : false,
          isWeapon: args.isWeapon ? args.isWeapon : false,
          isWriting: args.isWriting ? args.isWriting : false
        });
        return quality.save();
      }
    },
    addColor: {
      type: ColorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        isArmor: { type: GraphQLBoolean },
        isClothing: { type: GraphQLBoolean },
        isContainer: { type: GraphQLBoolean },
        isFurniture: { type: GraphQLBoolean },
        isMisc: { type: GraphQLBoolean },
        isTreasure: { type: GraphQLBoolean },
        isWeapon: { type: GraphQLBoolean },
        isWriting: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        let color = new Color({
          name: args.name,
          isArmor: args.isArmor ? args.isArmor : false,
          isClothing: args.isClothing ? args.isClothing : false,
          isContainer: args.isContainer ? args.isContainer : false,
          isFurniture: args.isFurniture ? args.isFurniture : false,
          isMisc: args.isMisc ? args.isMisc : false,
          isTreasure: args.isTreasure ? args.isTreasure : false,
          isWeapon: args.isWeapon ? args.isWeapon : false,
          isWriting: args.isWriting ? args.isWriting : false
        });
        return color.save();
      }
    },
    addMaterial: {
      type: MaterialType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        isArmor: { type: GraphQLBoolean },
        isClothing: { type: GraphQLBoolean },
        isContainer: { type: GraphQLBoolean },
        isFurniture: { type: GraphQLBoolean },
        isMisc: { type: GraphQLBoolean },
        isTreasure: { type: GraphQLBoolean },
        isWeapon: { type: GraphQLBoolean },
        isWriting: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        let material = new Material({
          name: args.name,
          isArmor: args.isArmor ? args.isArmor : false,
          isClothing: args.isClothing ? args.isClothing : false,
          isContainer: args.isContainer ? args.isContainer : false,
          isFurniture: args.isFurniture ? args.isFurniture : false,
          isMisc: args.isMisc ? args.isMisc : false,
          isTreasure: args.isTreasure ? args.isTreasure : false,
          isWeapon: args.isWeapon ? args.isWeapon : false,
          isWriting: args.isWriting ? args.isWriting : false
        });
        return material.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});