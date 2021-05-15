import React, { Component } from "react";
import MetricsComponent from "./metrics.Component";

class Metrics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCovidData: [],
            totalConfirmed: 0,
            totalActive: 0,
            totalRecovered: 0,
            totalDeath: 0,
            requestedDateTime: null,
            stateDD: [
                { value: '*', name: 'All' },
                { value: 'AN', name: 'Andaman and Nicobar Islands' },
                { value: 'AP', name: 'Andhra Pradesh' },
                { value: 'AR', name: 'Arunachal Pradesh' },
                { value: 'AS', name: 'Assam' },
                { value: 'BR', name: 'Bihar' },
                { value: 'CH', name: 'Chandigarh' },
                { value: 'CT', name: 'Chhattisgarh' },
                { value: 'DN', name: 'Dadra and Nagar Haveli and Daman and Diu' },
                { value: 'DL', name: 'Delhi' },
                { value: 'GA', name: 'Goa' },
                { value: 'GJ', name: 'Gujarat' },
                { value: 'HR', name: 'Haryana' },
                { value: 'HP', name: 'Himachal Pradesh' },
                { value: 'JK', name: 'Jammu and Kashmir' },
                { value: 'JH', name: 'Jharkhand' },
                { value: 'KA', name: 'Karnataka' },
                { value: 'KL', name: 'Kerala' },
                { value: 'LA', name: 'Ladakh' },
                { value: 'LD', name: 'Lakshadweep' },
                { value: 'MP', name: 'Madhya Pradesh' },
                { value: 'MH', name: 'Maharashtra' },
                { value: 'MN', name: 'Manipur' },
                { value: 'ML', name: 'Meghalaya' },
                { value: 'MZ', name: 'Mizoram' },
                { value: 'NL', name: 'Nagaland' },
                { value: 'OR', name: 'Odisha' },
                { value: 'PY', name: 'Puducherry' },
                { value: 'PB', name: 'Punjab' },
                { value: 'RJ', name: 'Rajasthan' },
                { value: 'SK', name: 'Sikkim' },
                { value: 'TN', name: 'Tamil Nadu' },
                { value: 'TG', name: 'Telangana' },
                { value: 'TR', name: 'Tripura' },
                { value: 'UP', name: 'Uttar Pradesh' },
                { value: 'UT', name: 'Uttarakhand' },
                { value: 'WB', name: 'West Bengal' }
            ],
            selectedState: '*',
            isShowLoader: true,
            isShowError: false
        }
    }

    componentDidMount() {
        this.getCovidMetricsData();
    }

    onChangeDD = (ddValue) => {
        this.setState({ selectedState: ddValue, isShowLoader: true }, () => this.getCovidMetricsData());
    }

    getCovidMetricsData = () => {
        let { allCovidData, totalConfirmed, totalActive, totalRecovered, totalDeath, requestedDateTime, selectedState, isShowLoader } = this.state;
        totalConfirmed = 0, totalActive = 0, totalRecovered = 0, totalDeath = 0;
        requestedDateTime = new Date().toLocaleString();
        let url = "https://api.covid19india.org/v4/min/data.min.json";
        fetch(url).then(res => res.json()).then(responseData => {
            if (responseData) {
                allCovidData = responseData;
                let metricsSetFunc = (key) => {
                    var stateWiseDate = responseData[key];
                    totalConfirmed += stateWiseDate.total.confirmed;
                    totalDeath += stateWiseDate.total.deceased;
                    totalRecovered += stateWiseDate.total.recovered;
                    totalActive += (stateWiseDate.total.confirmed - stateWiseDate.total.recovered - stateWiseDate.total.deceased);
                }
                if (selectedState == '*') {
                    for (const key in responseData) {
                        metricsSetFunc(key)
                    }
                }
                else {
                    metricsSetFunc(selectedState);
                }
                this.setState({ allCovidData, totalConfirmed, totalActive, totalRecovered, totalDeath, requestedDateTime, isShowLoader: false })
            }
        }).catch((err) => {
            console.log(err);
            this.setState({ isShowError: true, isShowLoader: false });
        })
    }

    onClickTryAgain = () => {
        this.setState({ isShowError: false, isShowLoader: true }, () => this.getCovidMetricsData())
    }

    render() {
        let { allCovidData, totalConfirmed, totalActive, totalRecovered, totalDeath, requestedDateTime, stateDD, selectedState, isShowLoader, isShowError } = this.state;
        return (
            <MetricsComponent
                {...{
                    metrics: {
                        allCovidData,
                        totalConfirmed,
                        totalActive,
                        totalRecovered,
                        totalDeath,
                        requestedDateTime,
                        stateDD, selectedState,
                        isShowLoader,
                        isShowError
                    }
                }}
                onChangeDD={this.onChangeDD.bind(this)}
                onClickTryAgain={this.onClickTryAgain.bind(this)}
            />
        )
    }
}

export default Metrics;