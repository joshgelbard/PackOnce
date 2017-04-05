import React from 'react';
import { AppRegistry, ListView, View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

// Row data (hard-coded)
const rows = {
  'Toiletries': [
    {id: 0, text: 'Toothbrush', checked: true},
    {id: 1, text: 'Shampoo', checked: true},
    {id: 2, text: 'Shaving Cream', checked: true},
  ],
  'Electronics': [
    {id: 3, text: 'Tablet', checked: true},
    {id: 4, text: 'Cell Phone', checked: true},
  ],
};

// Row and section comparison functions
const rowHasChanged = (r1, r2) => {
  console.log("here");
  console.log(r1);
  console.log(r2);
  return(r1.checked === r2.checked);
};
const sectionHeaderHasChanged = (s1, s2) => s1 !== s2;

// DataSource template object
const ds = new ListView.DataSource({rowHasChanged, sectionHeaderHasChanged});

export default class TripShow extends React.Component {

  constructor() {
    super();
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(rows)
    };
  }

  renderRow(rowData, sectionId) {
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

  renderSectionHeader(sectionRows, sectionId) {
    return (
      <Text style={styles.header}>
        {sectionId} ({sectionRows.length})
      </Text>
    );
  }

  render() {
    console.log("rerender");
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Brazil 2017</Text>
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    padding: 15,
    marginBottom: 5,
  },
  header: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'steelblue',
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 40,
    padding: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
