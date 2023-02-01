const { UserList, MovieList, WorkspaceList } = require("../FakeData");
const _ = require("lodash");

const { GraphQLClient, gql } = require("graphql-request");

const client = new GraphQLClient("http://localhost:4001/query");

const resolvers = {
  Query: {
    // USER RESOLVERS
    users: () => {
      let a = 10;
      let b = 20;
      let c = 30;
      console.log(a + b + c);
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    getallworkspaces: async () => {
      // localhost:4000 go hit api
      // return data
      // return data here

      const query = gql`
        query {
          getallworkspaces {
            _id
            name
            username
          }
        }
      `;
      const data = await client.request(query);
      console.log("data " + data.getallworkspaces);
      // const response = await client.query({
      //   query: query
      // });

      return data.getallworkspaces;
    },

    getworkspacesbyusername: async (parent, args) => {
      const query = gql`
        query ($username: String!) {
          getworkspacesbyusername(username: $username) {
            _id
            name
            username
          }
        }
      `;
      const username = args.username
      const data = await client.request(query, { username: username});
      return data.getworkspacesbyusername;
    },

    // MOVIE RESOLVERS
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },
  User: {
    favoriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });

      return userUpdated;
    },

    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },
};

module.exports = { resolvers };
