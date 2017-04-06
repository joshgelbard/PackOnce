import React from 'react';
import { AppRegistry, ListView, View, Text, TextInput,
  StyleSheet } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { FormLabel, FormInput } from 'react-native-elements';

const backendData = {
  0: {id: 0, text: 'Toothbrush', checked: true, category: 'Toiletries'},
  1: {id: 1, text: 'Shampoo', checked: true, category: 'Toiletries'},
  3: {id: 2, text: 'Shaving Cream', checked: true, category: 'Toiletries'},
  4: {id: 3, text: 'Tablet', checked: true, category: 'Electronics'},
  5: {id: 4, text: 'Cell Phone', checked: true, category: 'Electronics'},
};

var rows = {};
Object.keys(backendData).forEach( key => {
  if (!rows[backendData[key].category]) {
    rows[backendData[key].category] = [];
  }
  rows[backendData[key].category].push(backendData[key]);
});

// Row and section comparison functions
const rowHasChanged = (r1, r2) => {
  return(r1.checked === r2.checked);
};
const sectionHeaderHasChanged = (s1, s2) => s1 === s2;

// DataSource template object
const ds = new ListView.DataSource({rowHasChanged, sectionHeaderHasChanged});

export default class TripShow extends React.Component {

  constructor() {
    super();
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(rows),
      text: "",
    };
    this.addRow = this.addRow.bind(this);
    this.addHeader = this.addHeader.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
  }

  renderRow(rowData, sectionId) {
    if(rowData.text !== ""){
      return (
        <CheckBox containerStyle={styles.row}
          title={rowData.text}
          checked={rowData.checked}
          onPress={() => {
            rowData.checked = !rowData.checked;
            this.setState({dataSource: this.state.dataSource
              .cloneWithRowsAndSections(rows)});
          }}
        />
      );
    }
    else {
      return (
        <TextInput
          value={this.state.text}
          style={styles.newItem}
          placeholder="Type here!"
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={() => {
            styles.newItem={display: "none"};
            this.addRow(sectionId);
            this.state.text = "";
          }}
        />
      );
    }
  }

  renderSectionHeader(sectionRows, sectionId) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{sectionId} ({sectionRows.length})</Text>
        <Icon color="white" name='add' onPress={() => {
          this.addRow(sectionId);
          styles.newItem={display: "flex"};
        }}/>
      </View>
    );
  }

  addRow(sectionId) {
    rows[sectionId].push({text: this.state.text, checked: false, category: sectionId});
    this.setState({dataSource: this.state.dataSource
      .cloneWithRowsAndSections(rows)});
  }

  addHeader() {
    if (!rows[this.state.text]) {
      rows[this.state.text] = [];
    }
    this.setState({dataSource: this.state.dataSource
      .cloneWithRowsAndSections(rows)});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Brazil 2017</Text>
        <CheckBox containerStyle={styles.row}
          onPress={() => {
            styles.textInput={display: "flex"};
            this.forceUpdate();
          }}
          center
          title='Add Category'
          iconRight
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon='add'
          checkedColor='red'
          checked={false}
        />
        <TextInput
          value={this.state.text}
          style={styles.textInput}
          placeholder="Type here!"
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={() => {
            styles.textInput={display: "none"};
            this.addHeader();
            this.state.text = "";
          }}
        />
        <KeyboardAwareScrollView>
          <ListView
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            renderSectionHeader={this.renderSectionHeader}
            enableEmptySections={true}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container1: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  row: {
    padding: 15,
    marginBottom: 5,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'steelblue',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 40,
    padding: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    display: "none",
  },
  newItem: {
    display: "none",
  }
});
