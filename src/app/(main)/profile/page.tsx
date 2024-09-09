'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Lock, User, Settings, Activity, Trash2, HelpCircle, LogOut } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

export default function ProfileManager() {
  // const [profile, setProfile] = useState({
  //   firstName: 'Иван',
  //   lastName: 'Иванов',
  //   username: 'ivan123',
  //   email: 'ivan@example.com',
  //   phone: '+359 888 123 456',
  //   bio: 'Разработчик на софтуер с опит в React и Node.js.',
  //   avatar: '/placeholder.svg?height=100&width=100',
  //   notificationsEmail: true,
  //   notificationsSMS: false,
  //   notificationsPush: true,
  //   privacyPublic: false,
  //   darkMode: false,
  //   language: 'bg'
  // })

  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setProfile(prev => ({ ...prev, [name]: value }))
  // }

  // const handleSwitchChange = (name) => {
  //   setProfile(prev => ({ ...prev, [name]: !prev[name] }))
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log('Профилът е обновен:', profile)
  // }

  // return (
  //   <div className="container mx-auto p-4">
  //     <h1 className="text-3xl font-bold mb-6">Управление на профила</h1>
  //     <Tabs defaultValue="personal" className="space-y-4">
  //       <TabsList>
  //         <TabsTrigger value="personal">Лична информация</TabsTrigger>
  //         <TabsTrigger value="security">Сигурност</TabsTrigger>
  //         <TabsTrigger value="notifications">Известия</TabsTrigger>
  //         <TabsTrigger value="activity">Активност</TabsTrigger>
  //       </TabsList>

  //       <TabsContent value="personal">
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Лична информация</CardTitle>
  //             <CardDescription>Управлявайте вашата лична информация и настройки</CardDescription>
  //           </CardHeader>
  //           <CardContent className="space-y-4">
  //             <div className="flex items-center space-x-4">
  //               <Avatar className="w-24 h-24">
  //                 <AvatarImage src={profile.avatar} alt={profile.firstName} />
  //                 <AvatarFallback>{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
  //               </Avatar>
  //               <Button variant="outline">Промяна на аватар</Button>
  //             </div>
  //             <div className="grid grid-cols-2 gap-4">
  //               <div className="space-y-2">
  //                 <Label htmlFor="firstName">Име</Label>
  //                 <Input id="firstName" name="firstName" value={profile.firstName} onChange={handleChange} />
  //               </div>
  //               <div className="space-y-2">
  //                 <Label htmlFor="lastName">Фамилия</Label>
  //                 <Input id="lastName" name="lastName" value={profile.lastName} onChange={handleChange} />
  //               </div>
  //               <div className="space-y-2">
  //                 <Label htmlFor="username">Потребителско име</Label>
  //                 <Input id="username" name="username" value={profile.username} onChange={handleChange} />
  //               </div>
  //               <div className="space-y-2">
  //                 <Label htmlFor="email">Имейл</Label>
  //                 <Input id="email" name="email" type="email" value={profile.email} onChange={handleChange} />
  //               </div>
  //               <div className="space-y-2">
  //                 <Label htmlFor="phone">Телефон</Label>
  //                 <Input id="phone" name="phone" type="tel" value={profile.phone} onChange={handleChange} />
  //               </div>
  //               <div className="space-y-2">
  //                 <Label htmlFor="language">Език</Label>
  //                 <select
  //                   id="language"
  //                   name="language"
  //                   value={profile.language}
  //                   onChange={handleChange}
  //                   className="w-full p-2 border rounded"
  //                 >
  //                   <option value="bg">Български</option>
  //                   <option value="en">English</option>
  //                 </select>
  //               </div>
  //             </div>
  //             <div className="space-y-2">
  //               <Label htmlFor="bio">Биография</Label>
  //               <Textarea id="bio" name="bio" value={profile.bio} onChange={handleChange} rows={4} />
  //             </div>
  //             <div className="flex items-center space-x-2">
  //               <Switch
  //                 id="darkMode"
  //                 checked={profile.darkMode}
  //                 onCheckedChange={() => handleSwitchChange('darkMode')}
  //               />
  //               <Label htmlFor="darkMode">Тъмен режим</Label>
  //             </div>
  //           </CardContent>
  //           <CardFooter>
  //             <Button onClick={handleSubmit}>Запази промените</Button>
  //           </CardFooter>
  //         </Card>
  //       </TabsContent>

  //       <TabsContent value="security">
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Сигурност</CardTitle>
  //             <CardDescription>Управлявайте настройките за сигурност на вашия акаунт</CardDescription>
  //           </CardHeader>
  //           <CardContent className="space-y-4">
  //             <div className="space-y-2">
  //               <Label htmlFor="currentPassword">Текуща парола</Label>
  //               <Input id="currentPassword" type="password" />
  //             </div>
  //             <div className="space-y-2">
  //               <Label htmlFor="newPassword">Нова парола</Label>
  //               <Input id="newPassword" type="password" />
  //             </div>
  //             <div className="space-y-2">
  //               <Label htmlFor="confirmPassword">Потвърдете новата парола</Label>
  //               <Input id="confirmPassword" type="password" />
  //             </div>
  //             <div className="flex items-center space-x-2">
  //               <Switch id="2fa" />
  //               <Label htmlFor="2fa">Активирайте двуфакторна автентикация</Label>
  //             </div>
  //           </CardContent>
  //           <CardFooter>
  //             <Button>Обнови настройките за сигурност</Button>
  //           </CardFooter>
  //         </Card>
  //       </TabsContent>

  //       <TabsContent value="notifications">
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Известия</CardTitle>
  //             <CardDescription>Управлявайте как получавате известия</CardDescription>
  //           </CardHeader>
  //           <CardContent className="space-y-4">
  //             <div className="flex items-center space-x-2">
  //               <Switch
  //                 id="notificationsEmail"
  //                 checked={profile.notificationsEmail}
  //                 onCheckedChange={() => handleSwitchChange('notificationsEmail')}
  //               />
  //               <Label htmlFor="notificationsEmail">Имейл известия</Label>
  //             </div>
  //             <div className="flex items-center space-x-2">
  //               <Switch
  //                 id="notificationsSMS"
  //                 checked={profile.notificationsSMS}
  //                 onCheckedChange={() => handleSwitchChange('notificationsSMS')}
  //               />
  //               <Label htmlFor="notificationsSMS">SMS известия</Label>
  //             </div>
  //             <div className="flex items-center space-x-2">
  //               <Switch
  //                 id="notificationsPush"
  //                 checked={profile.notificationsPush}
  //                 onCheckedChange={() => handleSwitchChange('notificationsPush')}
  //               />
  //               <Label htmlFor="notificationsPush">Push известия</Label>
  //             </div>
  //           </CardContent>
  //           <CardFooter>
  //             <Button onClick={handleSubmit}>Запази настройките за известия</Button>
  //           </CardFooter>
  //         </Card>
  //       </TabsContent>

  //       <TabsContent value="activity">
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Активност на акаунта</CardTitle>
  //             <CardDescription>Преглед на последната активност на вашия акаунт</CardDescription>
  //           </CardHeader>
  //           <CardContent>
  //             <ul className="space-y-4">
  //               <li className="flex items-center space-x-2">
  //                 <Activity className="h-5 w-5" />
  //                 <span>Влизане от ново устройство - 15.05.2023, 14:30</span>
  //               </li>
  //               <li className="flex items-center space-x-2">
  //                 <Settings className="h-5 w-5" />
  //                 <span>Промяна на паролата - 10.05.2023, 09:15</span>
  //               </li>
  //               <li className="flex items-center space-x-2">
  //                 <User className="h-5 w-5" />
  //                 <span>Актуализация на профилна информация - 05.05.2023, 11:45</span>
  //               </li>
  //             </ul>
  //           </CardContent>
  //         </Card>
  //       </TabsContent>
  //     </Tabs>

  //     <div className="mt-8 space-y-4">
  //       <Card>
  //         <CardHeader>
  //           <CardTitle>Допълнителни опции</CardTitle>
  //         </CardHeader>
  //         <CardContent className="space-y-4">
  //           <Button variant="outline" className="w-full justify-start">
  //             <HelpCircle className="mr-2 h-4 w-4" />
  //             Център за помощ
  //           </Button>
  //           <Button variant="outline" className="w-full justify-start">
  //             <Trash2 className="mr-2 h-4 w-4" />
  //             Изтрий акаунта
  //           </Button>
  //           <Button variant="outline" className="w-full justify-start">
  //             <LogOut className="mr-2 h-4 w-4" />
  //             Излез от акаунта
  //           </Button>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   </div>
  // )
  return <main>Profile page</main>
}