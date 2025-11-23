"use client";

import { DataTable } from "@/features/users/components/user-data-table";
import { UserStateCards } from "@/features/users/components/user-state-cards";
import type { User, UserFormValues } from "@/features/users/utils/schema";
import { useState } from "react";

import initialUsersData from "@/constants/user-data.json";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsersData as User[]);

  const generateAvatar = (name: string) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleAddUser = (userData: UserFormValues) => {
    const newUser: User = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      name: userData.name,
      email: userData.email,
      avatar: generateAvatar(userData.name),
      role: userData.role,
      plan: userData.plan,
      billing: userData.billing,
      status: userData.status,
      joinedDate: new Date().toISOString().split("T")[0],
      lastLogin: new Date().toISOString().split("T")[0],
    };
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleDeleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleEditUser = (user: User) => {
    console.log("Edit user:", user);
  };

  return (
    <>
      <div className="px-4 lg:px-6 py-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage users and permissions</p>
        </div>
      </div>

      <div className="@container/main px-4 lg:px-6 space-y-6">
        <UserStateCards />

        <DataTable
          users={users}
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
          onAddUser={handleAddUser}
        />
      </div>
    </>
  );
}
