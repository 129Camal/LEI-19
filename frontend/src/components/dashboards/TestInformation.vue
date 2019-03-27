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
                @ready = "onChartReady"
            />
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
            chartData: [],
            chartOptions: {
                chart: {
                    title: 'Graph Sum Intensity per Scan',
                }
            }
        }
    },
    methods: {
        onChartReady (){
            axios.get('http://127.0.0.1:3001/mzml')
                .then(res => {
                
                this.chartData.push(['Scan', 'Intensity'])

                for(let i=0; i < res.data[0].scans.length; i++){
                    this.chartData.push([res.data[0].scans[i], res.data[0].intensity[i]])
                }

            })
            // eslint-disable-next-line
            .catch(err => console.log(err)) 
        }
    }
}

</script>
