const { gql } = require("apollo-server");
const { ObjectId } = require("mongodb");
const { getDB } = require("./db");

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!
    salary: Int!
  }

  type Query {
    getAllEmployees: [Employee]
    getEmployeeDetails(id: ID!): Employee
    getEmployeesByDepartment(department: String!): [Employee]
  }

  type Mutation {
    addEmployee(
      name: String!
      position: String!
      department: String!
      salary: Int!
    ): Employee
  }
`;

const resolvers = {
  Query: {
    getAllEmployees: async () => {
      const db = getDB();
      return db.collection("employees").find().toArray();
    },
    getEmployeeDetails: async (_, { id }) => {
      const db = getDB();
      return db.collection("employees").findOne({ _id: new ObjectId(id) });
    },
    getEmployeesByDepartment: async (_, { department }) => {
      const db = getDB();
      return db.collection("employees").find({ department }).toArray();
    },
  },
  Mutation: {
    addEmployee: async (_, args) => {
      const db = getDB();
      const result = await db.collection("employees").insertOne(args);
      return { id: result.insertedId, ...args };
    },
  },
  // 👇 THIS IS IMPORTANT
  Employee: {
    id: (parent) => parent._id?.toString(),
  },
};

module.exports = { typeDefs, resolvers };
