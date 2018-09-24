import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
// import fetchData from './test1';
// import Projects from './models/projects';
import base from './firebase';

export default class App extends React.Component {

  constructor() {
    super();
    let firestore = base.firestore();
    firestore.settings({
      timestampsInSnapshots: true
    });
    this.ref = firestore.collection('projects');
    this.unsubscribe = null;
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    // fetchData()
    // .then(data => console.log(data));
    // let projects = new Projects;
    // console.log(projects.all());
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

    // this.ref.get().then(snapshot => {
    //   let projects = [];
    //   snapshot.forEach((doc) => {
    //     let data = doc.data();
    //     projects.push({
    //       key: doc.id, // Document ID
    //       name: data.name,
    //       desc: data.description
    //     });
    //   });
    //   this.setState({
    //     projects
    //  });
    // });

    // this.ref.get().then(snapshot => this.onCollectionUpdate(snapshot));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    let projects = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      projects.push({
        key: doc.id, // Document ID
        name: data.name,
        desc: data.description
      });
    });
    this.setState({
      projects
   });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{"Let's do this !"}</Text>
        <FlatList
          data={this.state.projects}
          renderItem={({item}) => <View>
            <Text>{item.key}</Text>
            <Text style={{fontSize:30}}>{item.name}</Text>
            <Text>{item.desc}</Text>
          </View>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
