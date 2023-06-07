import React from 'react'

import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import client from "../../apollo-client";
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

const TopCards = () => {

    const { loading, error, data } = useQuery(GET_ARGOCD_DATA_QUERY, {
        client,
        variables: { "id": "6447cdc747ea2c74be345313" },
      });
    
    const [argoData, setArgoData] = useState(null);
    
    useEffect(() => {
      if (data) {
        console.log(JSON.stringify(data))
        setArgoData(data);
      }
    }, [data]);
    
    // Now you can access `argoData` which will be null initially and will be updated with the actual `data` once it's available.
    
    if (loading) {
      return <p>Loading...</p>;
    }
    
    if (error) {
      return <p>Error: {error.message}</p>;
    }
    
    if (!argoData) {
      return null;
    }
    // function to beautify the time format
    function formatCreationTimestamp(creationTimestamp) {
        const date = new Date(creationTimestamp);
      
        const options = {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        };
      
        const formattedDate = date.toLocaleDateString("en-US", options);
      
        return formattedDate;
    }
    function countDeployments(array) {
        let count = 0;
      
        for (let i = 0; i < array.length; i++) {
          if (array[i].kind === "Deployment") {
            count++;
          }
        }
      
        return count;
      }
    const currentDate = new Date(); // Get the current date

    const dateDiff = Math.floor((currentDate - new Date(formatCreationTimestamp(argoData.job.items[0].metadata.creationTimestamp))) / (1000 * 60 * 60 * 24));

    const totalMonths = Math.floor(dateDiff / 30);
    const totalDays = dateDiff % 30;

    console.log("Total months:", totalMonths);
    console.log("Total days:", totalDays);
    
  return (
    // 1 
    <div className='grid lg:grid-cols-4 gap-4 p-4'>
        <div className='lg:col-span-1.7 col-span-1.5 bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-gray-600'>APP HEALTH</p>
                <p className='text-2xl font-bold'>{argoData.job.items[0].status.health.status}</p>
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>+18%</span>
            </p>
        </div>
        {/* 2 */}
        <div className='lg:col-span-1.5 col-span-1.5 bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-gray-600'>CURRENT SYNC STATUS</p>
                <p className='text-2xl font-bold'>{argoData.job.items[0].status.resources[0].status}</p>
                <p className='text-black-500'>{formatCreationTimestamp(argoData.job.items[0].status.reconciledAt)}</p>  
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>+11%</span>
            </p>
        </div>
        {/* 3 */}
        <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-gray-600'>LAST SYNC RESULT</p>
                <p className='text-2xl font-bold'>{argoData.job.items[0].status.operationState.syncResult.resources[0].syncPhase} OK</p> 
                <p className='text-black-500'>{formatCreationTimestamp(argoData.job.items[0].status.history[4].deployedAt)}</p>    
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>+17%</span>
            </p>
        </div>
        {/* 4 */}
        <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-gray-600'>PIPELINE CREATED</p>
                
                {/* <p className='text-2xl font-bold'>{formattedDate}</p> */}
                <p className='text-2xl font-bold'>{formatCreationTimestamp(argoData.job.items[0].metadata.creationTimestamp)}</p>
                
            </div>
            {/* <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>{time}</span>
            </p> */}
        </div>
        {/* 5 */}
        <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-gray-600'>PIPELINE UPTIME</p>
                <p className='text-2xl font-bold'>{totalMonths} Months, {totalDays} Days</p>
                
            </div>
            {/* <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>{totalMonths} Months and {totalDays} Days</span>
            </p> */}
        </div>
        {/* 6 */}
        <div className='lg:col-span-1.5 col-span-1.5 bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-gray-600'>APPLICATIONS DEPLOYED </p>
                <p className='text-2xl font-bold'>{1} times</p>
                {/* <p className='text-black-500'>{formatCreationTimestamp(argoData.job.items[0].spec.syncPolicy.)}</p>   */}
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>1 </span>
            </p>
        </div>
        {/* 7 */}
        <div className='lg:col-span-1.5 col-span-1.5 bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-gray-600'>APPLICATION OutOfSync</p>
                <p className='text-2xl font-bold'>{argoData.job.items[0].status.history[4].id} times</p>
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>+11%</span>
            </p>
        </div>
        {/* 8 */}
        <div className='lg:col-span-1.5 col-span-1.5 bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-gray-600'>RUNNING PODS</p>
                <p className='text-2xl font-bold'>{countDeployments(argoData.job.items[0].status.operationState.syncResult.resources)} Pods/Cluster</p>

            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>+11%</span>
            </p>
        </div>
    </div>
  )
}

export default TopCards