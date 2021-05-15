import React, { Fragment } from "react";
import { Text, View, StyleSheet, Picker, ActivityIndicator, Button } from "react-native";


const MetricsComponent = (props) => {
    return (
        <Fragment>
            <View style={styles.mainContainer}>
                <View style={styles.sectionOne}>
                    <View >
                        <Text style={styles.header}>Covid 19 Metrics</Text>
                    </View>
                    <View>
                        <Text style={styles.fontStyle}>India</Text>
                    </View>
                    <View style={styles.pickerView}>
                        <View>
                            <Text style={styles.fontStyle}>State</Text>
                        </View>
                        <Picker
                            // mode="dropdown"
                            selectedValue={props.metrics.selectedState}
                            style={{ width: 150 }}
                            onValueChange={(itemValue, itemIndex) => props.onChangeDD(itemValue)}
                        >
                            {props.metrics.stateDD.map(data => (
                                <Picker.Item label={data.name} value={data.value} />
                            ))}
                        </Picker>
                    </View>
                </View>
                <View style={styles.sectionTwo}>
                    {!props.metrics.isShowLoader && !props.metrics.isShowError ?
                        <Fragment>
                            <View>
                                <Text style={styles.dateStyle}>As on {props.metrics.requestedDateTime}</Text>
                            </View>
                            <View style={styles.sectionTwoContainer}>
                                <View>
                                    <Text style={styles.fontStyle}>Confirmed</Text>
                                </View>
                                <View>
                                    <Text style={styles.fontStyle}>{props.metrics.totalConfirmed}</Text>
                                </View>
                            </View>
                            <View style={styles.sectionTwoContainer}>
                                <View>
                                    <Text style={styles.fontStyle}>Active</Text>
                                </View>
                                <View>
                                    <Text style={styles.fontStyle}>{props.metrics.totalActive}</Text>
                                </View>
                            </View>
                            <View style={styles.sectionTwoContainer}>
                                <View>
                                    <Text style={styles.fontStyle}>Recovered</Text>
                                </View>
                                <View>
                                    <Text style={styles.fontStyle}>{props.metrics.totalRecovered}</Text>
                                </View>
                            </View>
                            <View style={styles.sectionTwoContainer}>
                                <View>
                                    <Text style={styles.fontStyle}>Death</Text>
                                </View>
                                <View>
                                    <Text style={styles.fontStyle}>{props.metrics.totalDeath}</Text>
                                </View>
                            </View>
                        </Fragment> :
                        props.metrics.isShowError ?
                            <Fragment>
                                <View style={styles.centerAlign}>
                                    <Text style={styles.header}>Some failure occured</Text>
                                    <Button title="Try it again" onPress={props.onClickTryAgain} />
                                </View>
                            </Fragment>
                            : <ActivityIndicator size="large" color="#0000ff" />
                    }
                </View>
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    sectionOne: {
        height: '40%',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderBottomColor: '#000000',
        borderBottomWidth: 2,
        justifyContent: 'space-around'
    },
    sectionTwo: {
        height: '60%',
        justifyContent: 'space-around'
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    fontStyle: {
        fontSize: 20,
    },
    pickerView: {
        display: 'flex',
        flexDirection: 'row'
    },
    dateStyle: {
        textAlign: 'center',
        color: '#000000'
    },
    sectionTwoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    centerAlign: { alignItems: 'center' }
})

export default MetricsComponent;