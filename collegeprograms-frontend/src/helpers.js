
function getOptions (args) {
  return Object.keys(args).map(key => {
    return { value: key, label: args[key] };
  });
}

export default {
  getOptions
};
