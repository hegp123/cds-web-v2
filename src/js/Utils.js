module.exports = {
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  },
};