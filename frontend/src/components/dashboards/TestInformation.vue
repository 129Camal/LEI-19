<template>
    <div class="card">
        <div class="header">
            <h4 class="title">Data Information</h4>
        </div>
        <div class="content">
             
            <!-- <p>{{information}}</p> -->
            <GChart
                type="LineChart"
                :data="chartData"
                :options="chartOptions"
            />
            <p>{{information}}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { GChart } from 'vue-google-charts'

export default {
    name: 'testinformation',
    components:{
        GChart
    },
    data(){
        return {
            information: {},
            chartData: [
                ['Scan', 'Intensity'],
                ['2015', 1170],
                ['2016', 660],
                ['2017', 1030]
            ],
            chartOptions: {
                chart: {
                    title: 'Graph Sum Intensity per Scan',
                }
            }
        }
    },
    created(){
        axios.get('http://127.0.0.1:3001/mzml')
             .then(res => this.information = res.data)
            // eslint-disable-next-line
            .catch(err => console.log(err)) 
    }
}

</script>
