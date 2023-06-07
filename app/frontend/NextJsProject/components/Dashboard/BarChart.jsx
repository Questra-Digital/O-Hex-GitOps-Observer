import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { gql, useQuery } from "@apollo/client";
import client from "../../apollo-client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// GraphQL query
const GET_ARGOCD_DATA_QUERY = gql`
query GetJob($id: ID!){
    job(id: $id){
      items{
        spec{
          source{
            targetRevision
            repoURL
            path
          }
          project
          syncPolicy {
            syncOptions
            automated {
              prune
              selfHeal
            }
          }
          destination {
            server
            namespace
          }
        }
        status {
          health {
            status
          }
          sync {
            syncOptions
          }
          resources {
            version
            syncPhase
            status
            namespace
            name
          }
          summary {
            images
          }
          sourceType
          reconciledAt
          operationState {
            syncResult {
              source {
                repoURL
                targetRevision
                path
              }
              revision
              resources {
                version
                syncPhase
                status
                namespace
                name
                message
                kind
                hookPhase
                group
              }
            }
            startedAt
            phase
            operation {
              sync {
                revision
                syncOptions
                prune
              }
              retry {
                limit
              }
              initiatedBy {
                automated
              }
            }
            message
            finishedAt
          }
          history {
            source {
              targetRevision
              repoURL
              path
            }
            revision
            id
            deployedAt
            deployStartedAt
          }
        }
        metadata {
          creationTimestamp
          uid
          resourceVersion
          namespace
          name
          managedFields {
            apiVersion
            fieldsType
            manager
            operation
            time
          }
          generation
          annotations {
            kubectlkubernetesiolastappliedconfiguration
          }
        }
      }
      metadata {
        resourceVersion
      }
      
    }
  }
`;

const BarChart = () => {
  const { loading, error, data } = useQuery(GET_ARGOCD_DATA_QUERY, {
    client,
    variables: { "id": "6447cdc747ea2c74be345313" },
  });

const [argoData, setArgoData] = useState(null);
  
  
  

  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    
    if (data) {
      console.log(JSON.stringify(data))
      setArgoData(data);
    }
    //const formattedDate = argoData.job.items[0].metadata.creationTimestamp;
    setChartData({
      
      labels: [
        ['2023-01-28, 01:08:20 PM','d7a9ab468f490bee648df55b331a947b3ae17188'],
        ['2023-01-28, 01:16:37 PM','e9149205e979384cea4f17518186aa3e3fcaf9c7'],
        ['2023-01-28, 02:44:16 PM','d1ce6a39b7b8d3ce7f2a3fcc01211b0fb62f7446'],
        ['2023-01-28, 02:47:30 PM','257ae08e5fa6d17c0a43a817c4f99d28f7416cf9'],
        ['2023-02-10, 05:13:07 AM','08d2fe37dbe51ea337b0f40df54a6199d8d361bc'],
    ],
      datasets: [
        {
          label: 'revision',
          data: [1,2,3,4,5],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgb(53, 162, 235, 0.7)',
        },
      ],
    });
  
    setChartOptions({
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Deployment Information',
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: 'revision ID',
          },
        },
        x: {
          title: {
            display: true,
            text: 'deployedAt',
          },
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, [data])
  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  
  if (!argoData) {
    return null;
  }
  return (
    <>
      <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default BarChart;
