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

const SrcDest = () => {

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
    <div className='grid xl:grid-cols-2 gap-10 p-4'>
      <div className='xl:col-span-1.5 col-span-1.7 bg-white flex justify-center w-full border p-6 rounded-lg'>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'></span>
            </p>
            
            <div className='flex flex-col w-full p-5'>
                <p className='text-gray-600'>GITLAB</p>
                <p className='text-2xl font-bold'>Source</p>
                <p className='text-black-500'>TargetRevision: {argoData.job.items[0].spec.source.targetRevision}</p>
                <p className='text-black-500'>Repository: {argoData.job.items[0].spec.source.repoURL}</p>  
                <p className='text-black-500'>Path: {argoData.job.items[0].spec.source.path}</p>
            </div>
            
        </div>
        <div className='xl:col-span-1.5 col-span-1.7 bg-white flex justify-center w-full border p-6 rounded-lg'>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'></span>
            </p>
            <div className='flex flex-col w-full p-5'>
                <p className='text-gray-600'>kUBERNETES</p> 
                <p className='text-2xl font-bold'>Destination</p>
                <p className='text-black-500'>In cluster</p>
                <p className='text-black-500'>Server:   {argoData.job.items[0].spec.destination.server}</p>  
                <p className='text-black-500'>Namespace: {argoData.job.items[0].spec.destination.namespace}</p> 
                <p className='text-black-500'>Image Deployed: {argoData.job.items[0].status.summary.images}</p> 
            </div>
            
        </div>
    </div>
  )
}

export default SrcDest