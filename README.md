# Tree shaking

To start the project, make sure you have `yarn` installed and do the following steps:
- run `yarn install`
- run `yarn run dev`
- open `localhost:3000`

To test Webpack tree-shaking...

either test it with browser with production server
- `yarn run build`
- `yarn run start`
- open `localhost:3000`

or with bundle analyzer
- `yarn run prepare-stats`
- `yarn run analyze`

See what is bundled, what bundle size is, then edit `./src/components/layout`, play with
uncommenting core components, see what tree shaking works for core as size increases and
more stuff is bundled.

Then, uncomment pickers component, see nothing is any different, size is the same,
which simply means that the whole pickers library is bundled no matter what is used.
