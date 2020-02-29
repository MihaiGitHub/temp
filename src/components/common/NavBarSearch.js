import React, { Component } from 'react';
import { connect } from 'react-redux';
import { propertiesFiltered } from '../../actions/PropertiesActions';
import { Header, Item, Input, Icon, Tab, Tabs, TabHeading, Text, Container, Content } from 'native-base';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { PermissionsAndroid } from 'react-native';
//import Geolocation from 'react-native-geolocation-service';

import Tab1 from '../properties/Tab1';
import Tab2 from '../properties/Tab2';


class NavBarSearch extends Component {
    render() {
        const searchTerm = this.props.properties.searchTerm ? this.props.properties.searchTerm : 'Current Location'

        return (
          <Container>
                      <Header searchBar rounded hasTabs > 
              <Item>
                <Icon name="ios-search" />
                <Input 
                  placeholder={searchTerm}
                  onFocus={ async () => {
                    Actions.propertySearch()

                    /*
                    try {
                      const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                          'title': 'Example App',
                          'message': 'Example App access to your location '
                        }
                      )

                      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                              Geolocation.getCurrentPosition(
                                  (position) => {
                                      Actions.propertySearch({ position })
                                  },
                                  (error) => {
                                      // See error code charts below.
                                      console.log(error.code, error.message);
                                  },
                                  { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                              );
                       
                      } else {
                        alert("Location permission denied");
                      }
                    } catch (err) {
                      console.warn(err)
                    }
                    */
                  }} />
                <Icon2 
                  name="sliders"
                  size={25}
                  style={styles.icon2} />
              </Item>
             </Header>

            <Tabs style={Platform.OS === 'android' ? { overflow: 'hidden' } : null}>
              <Tab heading={ <TabHeading><Text>List</Text></TabHeading>}>
                <Tab1 />
              </Tab>
              <Tab heading={ <TabHeading><Text>Map</Text></TabHeading>}>
                <Tab2 />
              </Tab>
            </Tabs>
              
        </Container>
        );
     }
}

const styles = {
    icon2: {
      paddingRight: 10
    }
}

const mapStateToProps = ({ properties }) => {
    return { properties };
}

export default connect(mapStateToProps, { propertiesFiltered })(NavBarSearch);