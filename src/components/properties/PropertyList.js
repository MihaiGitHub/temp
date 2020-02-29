import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Picker, Icon, Tab, Tabs, TabHeading, Text } from 'native-base';
import GLOBALS from '../common/Globals';
import { propertiesFetch } from '../../actions';
import { Spinner } from '../common/Spinner';
import PropertyItem from './PropertyItem';

import Tab1 from '../properties/Tab1';
import Tab2 from '../properties/Tab2';


class PropertyList extends Component {

    state = {
        selected: "key3"
    }  

    static getDerivedStateFromProps(nextProps, prevState){
        if(Array.isArray(nextProps.listFiltered)){
            if(nextProps.listFiltered.length > 0){
                // Code executes only once, updates image URLs
                // Update listFiltered array on the fly
                nextProps.listFiltered.map(property => {

                    if(property.pImage.length > 0){
                        // Property has images
                        // Update array items on the fly
                        property.pImage.forEach((item, index, arr) => {
                            if(arr[index].charAt(0) === '/')
                                arr[index] = `${GLOBALS.BASE_URL}${item}`;
                        })

                    } else {
                        property.pImage.push(`${GLOBALS.BASE_URL}/dashboard/img/house.gif`)
                    }
                })
            } else {
                nextProps.propertiesFetch()
            }
        }

        return null;
    }

    sortHandler = (value) => {
        if(value === 'key1'){
            this.props.listFiltered.sort((a, b) => (a.price > b.price) ? 1 : -1)
        }
        
        if (value === 'key2'){
            this.props.listFiltered.sort((a, b) => (a.price < b.price) ? 1 : -1)
        }

        if (value === 'key3'){
            this.props.listFiltered.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1) 
        }

        this.setState({ selected: value });
    }

    render() {        
        if(this.props.loading){
            return <Spinner size="large" />;
        }
/*
        return (
            <Container>
                <Content>
                    
  

                   <PropertyItem {...this.props} />   

                </Content>
            </Container>
        );
        */
       return (
            <PropertyItem {...this.props} />
       );
    }
}

const mapStateToProps = state => {
    const { listFiltered, loading } = state.properties;

    return { listFiltered, loading };
};

// Anytime state updates, connect helper will rerun mapStateToProps to make it available as props in component
export default connect(mapStateToProps, { propertiesFetch })(PropertyList);