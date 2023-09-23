# My Cleaner

A file and folders cleaner for developers

One of the biggest annoying part about software development is installing packages. Usually a developer builds a small amount of projects and installs a lot of packages 😒 Some projects become just old test projects but you are too afraid to remove them. It may worth keeping them but not their dependencies. This is where My Cleaner comes in. It will remove all the dependencies of a project and save the space 😁

## Setup

1. Clone the repo
2. Run `pnpm install`
    - It is recommended to use pnpm but you can use npm or yarn
3. Copy .env.example to .env
4. Put your apps directory in the APPS_DIR variable
    - It will throw an error if you don't
5. Run `pnpm start`
6. See the magic happen

## Todo

- [x] Support Node (npm, yarn, pnpm) Projects
- [ ] Support dotnet Projects
- [ ] Support Flutter Projects

## Contributing

Feel free to contribute to this project. You can open an issue or a pull request. I will try to respond as soon as possible.
