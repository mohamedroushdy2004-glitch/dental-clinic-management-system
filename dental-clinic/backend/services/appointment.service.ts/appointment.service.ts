import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createAppointment = async (data: {
  patientId: string;
  doctorId: string;
  serviceId: string;
  startTime: Date;
}) => {
  const service = await prisma.service.findUnique({ where: { id: data.serviceId } });
  if (!service) throw new Error("Service not found");

  const endTime = new Date(data.startTime.getTime() + service.duration * 60000);

  const overlap = await prisma.appointment.findFirst({
    where: {
      doctorId: data.doctorId,
      status: { notIn: ['CANCELLED'] },
      OR: [
        {
          startTime: { lt: endTime },
          endTime: { gt: data.startTime },
        },
      ],
    },
  });

  if (overlap) {
    throw new Error("Doctor is already booked at this time.");
  }

  return prisma.appointment.create({
    data: {
      patientId: data.patientId,
      doctorId: data.doctorId,
      serviceId: data.serviceId,
      appointmentDate: data.startTime,
      startTime: data.startTime,
      endTime: endTime,
      status: 'PENDING',
    },
  });
};