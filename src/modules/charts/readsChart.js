import React, { useEffect, useState, useContext, useMemo } from "react";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import './readsChart.css'
import MaterialReactTable from "material-react-table";
import "gridjs/dist/theme/mermaid.css";
import axios, { all } from "axios";
import Loading from "../MiniModules/Loading";
import MainContext from "../../cntxt";
import AddReading from "./AddReading";
import { original } from "@reduxjs/toolkit";

Chart.register(CategoryScale);

const domen = 'http://192.168.1.187:3002/';

export default function ReadsChart() {
  var { setModal,currentSwipInd } = useContext(MainContext);
  const [readsState, setReadsState] = useState();
  const [logs, setLogs] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [reconnCount, setReconnCount] = useState(0)
  const url = domen+'api/readings';

  const addReading = () => {
    setModal({
      isModOpen: true,
      children: <AddReading />
    })
  }

  const changeLogsRefresh = () => {
    axios.get(domen+'api/changelogs', {
      headers: {
        Authorization: localStorage.getItem('frame')
      }
    }).then((resp) => {
        setLoading(false)
        setLogs(resp.data);
    }).catch((err) => {
      if (err) {
        setLoading(true);
      }
    });
  }


  const gridRefresh = () => {
    axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('frame')
      }
    }).then((resp) => {
        setLoading(false)
        setReadsState(resp.data);
    }).catch((err) => {
      if (err) {
        setLoading(true);
        console.log(err);
      }
    });
}

  const columns = [
    {
      accessorKey: 'id', //id required if you use accessorFn instead of accessorKey
      header: 'ID',
      maxSize: 200,
      size: 50,
    },
    {
      accessorKey: 'date', //simple recommended way to define a column
      header: 'Дата',
      maxSize: 200,
      size: 120
    },
    {
      accessorKey: 'prev_value', //id required if you use accessorFn instead of accessorKey
      header: 'Предыдущее',
      maxSize: 200,
      size: 150,
    },
    {
      accessorKey: 'value', //id required if you use accessorFn instead of accessorKey
      header: 'Текущее',
      maxSize: 200,
      size: 100,
    },
    {
      accessorFn: (originalRow) => originalRow.value - originalRow.prev_value,
      id: 'key', //id required if you use accessorFn instead of accessorKey
      header: 'Разница',
      maxSize: 200,
      size: 100,
    },
  ]

  useEffect(() => {
    gridRefresh()
    changeLogsRefresh()
  }, [])

  if (!readsState) {
    return (
      <div className="loading-wrapper">
        <Loading size='max' width={'100%'} height={'400px'}/>
      </div>
    )
  } else {
    console.log(readsState);
    return (
      <div className="readsChart">
          <div className="GridReads">
            {/* MAKE NEW MATERIAL REACT TABLE | LIBRARY ALREADY INSTALLED   */}
            <MaterialReactTable
              columns={columns}
              data={readsState.light}
              enableFullScreenToggle={false}
              enableDensityToggle={false}
              enableFilters={true}
            />
          </div>
          {/* <div className="ChartReads">
            <Line
                type="line"
                redraw={true}
                options={{
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: "Показания счётчиков",
                        fontSize: 20
                    },
                    legend: {
                        display: true, //Is the legend shown?
                        position: "bottom" //Position of the legend.
                    }
            }}
            data={{
              labels: readsState.gas.map(gas => gas.date),
              datasets: [
                {
                  label: 'Газ',
                  data: readsState.gas.map(read => read.value - read.prev_value)
                },
                {
                  label: 'Вода',
                  data: readsState.water.map(read => read.value - read.prev_value)
                },
                {
                  label: 'Свет',
                  data: readsState.light.map(read => read.value - read.prev_value)
                }
              ]
            }}
            />
          </div> */}
          <div className="logReads">
            {logs ? 
              <div className="GridReads">
                {/* MAKE NEW MATERIAL REACT TABLE | LIBRARY ALREADY INSTALLED   */}
                <MaterialReactTable
                  columns={columns}
                  data={readsState.gas}
                  enableRowSelection={false}
                  enableColumnOrdering={false}
                  enableGlobalFilter={false}
                />
                <div className="GridReadsButtons">
                </div>
              </div>
            : 
            <div>
              <Loading size='max' width={'100%'} height={'400px'}/>
            </div>
            }
          </div>
      </div>
    );
  }
};