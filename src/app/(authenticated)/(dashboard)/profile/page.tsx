'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  X,
  Calendar,
  Loader,
} from 'lucide-react';
import { TUser } from '@/types/auth';
import { updateProfile, verifyMe } from '@/actions/auth';
import dayjs from 'dayjs';
import Image from 'next/image';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [edit, setEdit] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<TUser>>({
    name: {
      firstName: '',
      lastName: '',
      middleName: '',
    },
    email: '',
    phoneNumber: '',
    profilePicture: '',
    address: {
      city: '',
      country: '',
      postalCode: '',
      state: '',
      street: '',
    },
  });

  const handleChange = <K extends keyof TUser>(name: K, value: TUser[K]) => {
    // Split name like "name.firstName" or "address.city"
    const keys = name.split('.');
    setFormData((prev) => {
      let newData = { ...prev };

      // Handle nested updates
      if (keys.length === 2) {
        const [parent, child] = keys;
        newData = {
          ...newData,
          [parent]: {
            ...(newData[parent as keyof typeof newData] as any),
            [child]: value,
          },
        };
      } else {
        newData = { ...newData, [name]: value };
      }

      return newData;
    });
  };

  const [data, setData] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const res = await verifyMe();
    const myData: TUser = res?.data;
    if (myData) {
      setData(myData);
      setFormData({
        name: myData?.name || '',
        email: myData?.email || '',
        phoneNumber: myData?.phoneNumber || '',
        profilePicture: myData?.profilePicture || '',
        address: myData?.address || {
          city: '',
          country: '',
          postalCode: '',
          state: '',
          street: '',
        },
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSave = async () => {
    setEditing(true);
    const res = await updateProfile(formData);

    if (res) {
      toast.success(res?.message);
      setEdit(false);
      getData();
    }
    setEditing(false);
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground flex items-center gap-2 text-2xl font-bold">
            <User size={24} />
            My Profile
          </h1>
          <p className="text-muted-foreground mt-1 text-xs">
            Manage your personal information
          </p>
        </div>
        <Button
          onClick={() => setEdit(!edit)}
          variant={edit ? 'outline' : 'default'}
          className="h-8 gap-2 text-xs"
          size="sm"
        >
          {edit ? (
            <>
              <X size={14} /> Cancel
            </>
          ) : (
            <>
              <Edit2 size={14} /> Edit
            </>
          )}
        </Button>
      </div>

      {/* Profile Avatar Section */}
      <Card className="bg-card p-3">
        <div className="flex items-center gap-3">
          <div className="from-primary to-accent flex size-20 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br">
            {data?.profilePicture ? (
              <Image
                src={data?.profilePicture}
                height={60}
                width={60}
                alt={data?.fullName || data?.name?.firstName}
              />
            ) : (
              <User className="text-primary-foreground" size={32} />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-foreground text-lg font-bold">
              {data?.fullName}
            </h2>
            <p className="text-muted-foreground truncate text-xs">
              {formData.email}
            </p>
            <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
              <Calendar size={12} />
              Member since: {dayjs(data?.createdAt).format('DD/MM/YYYY')}
            </p>
          </div>
        </div>
      </Card>

      {/* Profile Form */}
      <Card className="bg-card p-3">
        <h3 className="text-foreground mb-3 text-sm font-semibold">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="col-span-2 grid grid-cols-3 gap-3">
            {/* First Name */}
            <div>
              <label className="text-foreground mb-1 block text-sm font-medium">
                First Name
              </label>
              <Input
                type="text"
                name="firstName"
                value={formData.name?.firstName}
                onChange={(e) =>
                  handleChange('name', {
                    firstName: e.target.value,
                    middleName: formData.name?.middleName ?? '',
                    lastName: formData.name?.lastName ?? '',
                  })
                }
                disabled={!edit}
                className="bg-input text-foreground text-xs"
              />
            </div>

            {/* Middle Name */}
            <div>
              <label className="text-foreground mb-1 block text-sm font-medium">
                Middle Name
              </label>
              <Input
                type="text"
                name="lastName"
                value={formData.name?.middleName}
                onChange={(e) =>
                  handleChange('name', {
                    firstName: formData?.name?.firstName || '',
                    middleName: e.target.value,
                    lastName: formData.name?.lastName ?? '',
                  })
                }
                disabled={!edit}
                className="bg-input text-foreground text-xs"
              />
            </div>
            {/* Last Name */}
            <div>
              <label className="text-foreground mb-1 block text-sm font-medium">
                Last Name
              </label>
              <Input
                type="text"
                name="lastName"
                value={formData.name?.lastName}
                onChange={(e) =>
                  handleChange('name', {
                    firstName: formData?.name?.firstName || '',
                    middleName: formData.name?.middleName ?? '',
                    lastName: e.target.value,
                  })
                }
                disabled={!edit}
                className="bg-input text-foreground text-xs"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-foreground mb-1 flex items-center gap-1 text-sm font-medium">
              <Phone size={14} /> Phone
            </label>
            <Input
              type="tel"
              name="phone"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              disabled={!edit}
              className="bg-input text-foreground text-xs"
            />
          </div>

          {/* Country */}
          <div>
            <label className="text-foreground mb-1 flex items-center gap-1 text-sm font-medium">
              <MapPin size={14} /> Country
            </label>
            <Input
              type="text"
              name="country"
              value={formData.address?.country}
              onChange={(e) =>
                handleChange('address', {
                  ...formData.address,
                  country: e.target.value,
                })
              }
              disabled={!edit}
              className="bg-input text-foreground text-xs"
            />
          </div>

          {/* City */}
          <div>
            <label className="text-foreground mb-1 block text-sm font-medium">
              City
            </label>
            <Input
              type="text"
              name="city"
              value={formData.address?.city}
              onChange={(e) =>
                handleChange('address', {
                  ...formData.address,
                  city: e.target.value,
                })
              }
              disabled={!edit}
              className="bg-input text-foreground text-xs"
            />
          </div>
          {/* City */}
          <div>
            <label className="text-foreground mb-1 block text-sm font-medium">
              Postal Code
            </label>
            <Input
              type="text"
              name="postalCode"
              value={formData.address?.postalCode}
              onChange={(e) =>
                handleChange('address', {
                  ...formData.address,
                  postalCode: e.target.value,
                })
              }
              disabled={!edit}
              className="bg-input text-foreground text-xs"
            />
          </div>
        </div>

        {edit && (
          <div className="mt-3 flex gap-2">
            <Button
              disabled={editing}
              onClick={handleSave}
              className="h-8 flex-1 gap-2 text-xs"
            >
              {editing ? (
                <Loader size={14} className="animate-spin" />
              ) : (
                <Save size={14} />
              )}{' '}
              Save
            </Button>
            <Button
              disabled={editing}
              onClick={() => setEdit(false)}
              variant="outline"
              className="h-8 flex-1 gap-2 bg-transparent text-xs"
            >
              <X size={14} /> Cancel
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
