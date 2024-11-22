"use client";

import React, { useEffect, useState } from "react";
import { 
  Container, 
  Typography, 
  Card, 
  Box, 
  Button,
  Grid,
  Divider,
  Skeleton
} from "@mui/material";
import { useRouter } from "next/navigation";
import { facultyAPI, type FacultyProfile } from "@/services/api";
import Layout from "../common/Layout";
import { 
  Dashboard as DashboardIcon,
  Edit as EditIcon,
  EventAvailable as RegisterIcon,
  History as HistoryIcon
} from "@mui/icons-material";
import Image from "next/image";



const FacultyProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<FacultyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await facultyAPI.getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const ProfileField = ({ label, value }: { label: string; value: string | undefined }) => (
    <Box className="mb-6 text-center">
      <Typography variant="h6" className="text-gray-600 font-medium mb-2">
        {label}
      </Typography>
      <Typography variant="h5" className="text-gray-800">
        {value || "Not provided"}
      </Typography>
    </Box>
  );

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="lg" className="py-12">
          <Skeleton variant="rectangular" height={200} className="mb-4" />
          <Skeleton variant="rectangular" height={400} />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" className="py-12">
        <Card className="p-8 shadow-lg">
          {/* Header */}
          <Box className="mb-8 text-center">
            <Typography
              variant="h3"
              className="mb-2 font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
            >
              Faculty Profile
            </Typography>
            <Typography variant="subtitle1" className="text-gray-600">
              {profile?.department}
            </Typography>
          </Box>

          <Divider className="mb-8" />

          {/* Two-Column Layout */}
          <Grid container spacing={4}>
            {/* Left Column - Profile Information */}
            <Grid item xs={12} md={6}>
              <Box className="space-y-6 pr-4">
                <ProfileField label="Faculty ID" value={profile?.faculty_id.toString()} />
                <ProfileField label="Name" value={profile?.name} />
                <ProfileField label="Email" value={profile?.email} />
                <ProfileField label="Department" value={profile?.department} />
            
              </Box>
            </Grid>

            {/* Right Column - Image */}
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://picsum.photos/800/600"
                alt="Faculty Image"
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
              />
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => router.push('/faculty/edit-profile')}
                  className="bg-blue-600 hover:bg-blue-700 normal-case"
                >
                  Edit Profile
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<RegisterIcon />}
                  onClick={() => router.push('/faculty/registered-fairs')}
                  className="bg-purple-600 hover:bg-purple-700 normal-case"
                >
                  Registered Fairs
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<HistoryIcon />}
                  onClick={() => router.push('/faculty/attendance-history')}
                  className="bg-indigo-600 hover:bg-indigo-700 normal-case"
                >
                  Attendance History
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Layout>
  );
};

export default FacultyProfilePage;
