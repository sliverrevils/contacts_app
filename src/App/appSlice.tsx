import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const contactsApp=createApi({
    reducerPath:'contacts',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3001'}),
    tagTypes:['Contacts'],
    endpoints:builder=>({
        getContacts:builder.query({
            query:(user:string)=>`/contacts?user=${user}`,
            providesTags:['Contacts']
        }),
        addContact:builder.mutation({
            query:(contact:{name:string,number:string,user:string})=>({
                url:'/contacts',
                method:'POST',
                body:contact
            }),
            invalidatesTags:['Contacts']
        }),
        delContact:builder.mutation({
            query:(id:string)=>({
                url:`/contacts/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Contacts']
        }),
        updateContact:builder.mutation({
            query:(data:{id:string,contact:{name:string,number:string}})=>({
                url:`/contacts/${data.id}`,
                method:'PATCH',
                body:data.contact
            }),
            invalidatesTags:['Contacts']
        })
       
        
    })
})

