import React, { Component } from "react";
import ReactDOM from "react-dom";
import DisplayEditorContent from "./DisplayEditorContent";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});
class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      data: {}
    };
  }

  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  onEditorStateChange = editorState => {
    console.log(editorState);
    var rawJson = convertToRaw(this.state.editorState.getCurrentContent());
    this.setState({
      editorState,
      data: Object.assign({}, rawJson)
    });
    console.log(this.state.editorState);
  };
  Save = () => {
    console.log(this.state.data);
  };
  render() {
    const classes = this.props;

    return (
      <div style={{ padding: "50px" }}>
        <h1> Text Editor</h1>
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Editor
                  editorState={this.state.editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <div style={{ padding: "10px 0 10px 10px" }}>
                  <h2>Your Daily Times NewsPaper</h2>
                  {this.isEmpty(this.state.data) ? (
                    "Today's Top Headlines"
                  ) : (
                    <DisplayEditorContent value={this.state.data} />
                  )}
                </div>
              </Paper>
            </Grid>
          </Grid>
          <div />
          <div />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TextEditor);
ReactDOM.render(<TextEditor />, document.getElementById("root"));
