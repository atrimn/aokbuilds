import { listAll, ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'

export const getClassesUrl = async () => {
  const listRef = ref(storage, 'classes/')
  const { items } = await listAll(listRef)
  const urls = items.map(async (item) => {
    const url = await getDownloadURL(item)
    return url
  })

  return Promise.all(urls)
}

export const getClassesAsync = async () => {
  const urls = await getClassesUrl()
  const data = urls.map(async (url) => {
    const className = url.substring(
      url.indexOf('%2F') + 3,
      url.lastIndexOf('.json')
    )
    const res = await fetch(url).then((res) => res.json())
    return {
      class: className,
      data: res,
    }
  })

  return Promise.all(data)
}
