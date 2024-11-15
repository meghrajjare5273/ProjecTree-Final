import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Home, MessageSquare, Search, User } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">UniConnect</h1>
            <nav className="hidden md:flex space-x-4">
              <Button variant="ghost" size="sm"><Home className="mr-2 h-4 w-4" /> Home</Button>
              <Button variant="ghost" size="sm"><MessageSquare className="mr-2 h-4 w-4" /> Messages</Button>
              <Button variant="ghost" size="sm"><Bell className="mr-2 h-4 w-4" /> Notifications</Button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Input type="search" placeholder="Search..." className="hidden md:block w-64" />
            <Button size="icon" variant="ghost">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="@username" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create a Post</CardTitle>
                <CardDescription>Share your thoughts or project updates with your peers</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea placeholder="What's on your mind?" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Add Media</Button>
                <Button>Post</Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              {posts.map((post, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                        <AvatarFallback>{post.authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{post.authorName}</CardTitle>
                        <CardDescription>{post.timestamp}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{post.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost">Like</Button>
                    <Button variant="ghost">Comment</Button>
                    <Button variant="ghost">Share</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Jane Doe</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Computer Science, 3rd Year</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">University of Technology</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <User className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>AI-powered Study Assistant</li>
                  <li>Sustainable Campus Initiative</li>
                  <li>Peer-to-Peer Tutoring Platform</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>University Spotlight</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold">University of Technology</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Known for innovation and research excellence</p>
                <ul className="list-disc pl-4 mt-2 space-y-1 text-sm">
                  <li>Top-ranked Computer Science program</li>
                  <li>State-of-the-art research facilities</li>
                  <li>Strong industry partnerships</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2024 UniConnect. All rights reserved.</p>
            <nav className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">About</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Privacy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Terms</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Contact</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

const posts = [
  {
    authorName: "Alex Johnson",
    authorAvatar: "/placeholder-user.jpg",
    timestamp: "2 hours ago",
    content: "Just finished my presentation on renewable energy solutions for urban campuses. Excited to share it with the Environmental Science department tomorrow!"
  },
  {
    authorName: "Samantha Lee",
    authorAvatar: "/placeholder-user.jpg",
    timestamp: "5 hours ago",
    content: "Looking for team members for the upcoming hackathon. We're working on a mobile app to help students manage their mental health. DM if interested!"
  },
  {
    authorName: "Mohammed Patel",
    authorAvatar: "/placeholder-user.jpg",
    timestamp: "1 day ago",
    content: "Our research on quantum computing algorithms just got accepted for publication! Proud of the entire team for their hard work and dedication."
  }
]