# depn-web-dev

depn-web-dev is a dev version of website displays npm package dependencies in interative hierarchy tree using depn module.

## Getting Started

In order to build the app in your environments, configurations are neccessary. You need mongodb (will use cloud provider in production), config keys (such as oauth clientId and clientSecret). Lastly, the default mongodb protocol port is set to 27018. You can change it at db.js.

### Prerequisites

mongodb server [download here](https://www.mongodb.com/download-center/community) & should be in process [more info](https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/)
node (>v12) - The app uses async/await feature

```
mongod --dbpath ${absolute path to db folder} --port ${default:27018}
```

### Installing

Please follow directions below. And run test cases. The list test commands available at package.json

In root folder, install all the dependencies.

```
npm install & npm install --prefix=client
```

make sure if mongodb server is running on background. I would suggest installing mongodb GUI such as [mongodb compass](https://www.mongodb.com/products/compass)

Run the all tests
```
npm run test
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [express](expressjs.com) - The web framework used
* [mongoose](mongoosejs.com) - Dependency Management
* [create-react-app](https://facebook.github.io/create-react-app/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Benjamin Morrison** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc