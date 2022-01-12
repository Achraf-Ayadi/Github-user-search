import React, { useState, useEffect, useContext } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [followers, setFollowers] = useState(mockFollowers)
  const [repos, setRepos] = useState(mockRepos)

  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(false)
  const [request, setRequest] = useState(0)
  const [error, setError] = useState({ show: false, msg: ' ' })

  const fetchRequest = () => {
    const requestUrl = `${rootUrl}/rate_limit`
    axios(requestUrl)
      .then(({ data }) => {
        const {
          rate: { remaining },
        } = data
        setRequest(remaining)

        if (remaining === 0) {
          toggleError(true, 'sorry, you have exeeded your hourly rate limit! ')
          console.log(error)
        }
      })
      .catch((error) => console.log(error))
  }
  const toggleError = (show, msg) => {
    setError({ show, msg })
  }
  const searchUser = async (user) => {
    setLoading(true)
    setError(false, ' ')

    const response = await axios(`${rootUrl}/users/${user}`).catch((error) =>
      console.log(error)
    )

    if (response) {
      setGithubUser(response.data)
      const { followers_url, repos_url } = response.data

      await Promise.allSettled([
        axios(followers_url),
        axios(`${repos_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results
          const status = 'fulfilled'
          if (repos.status === 'fulfilled') {
            setRepos(repos.value.data)
          }
          if (followers.status === 'fulfilled') {
            setRepos(followers.value.data)
          }
          
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      toggleError(true, 'this username is not found ')
    }
    setLoading(false)
  }

  useEffect(fetchRequest, [])

  return (
    <AppContext.Provider
      value={{
        githubUser,
        followers,
        repos,
        setUser,
        user,
        request,
        error,
        searchUser,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}
export { AppContext, AppProvider }
