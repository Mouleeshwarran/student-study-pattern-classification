package com.example.otp_backend.service;

import com.example.otp_backend.entity.OtpVerification;
import com.example.otp_backend.repository.OtpRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class OtpService {

    private final OtpRepository otpRepository;
    private final JavaMailSender mailSender;

    public OtpService(
            OtpRepository otpRepository,
            JavaMailSender mailSender) {

        this.otpRepository = otpRepository;
        this.mailSender = mailSender;
    }

    public String generateOtp(String email) {

        String otp = String.valueOf(
                100000 + new Random().nextInt(900000)
        );

        OtpVerification verification =
                new OtpVerification(email, otp);

        otpRepository.save(verification);

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Your Survey OTP");
        message.setText(
                "Your OTP is: " + otp +
                        "\n\nThis OTP is valid for verification."
        );

        mailSender.send(message);

        return otp;
    }



    public boolean verifyOtp(String email, String otp) {

        OtpVerification verification =
                otpRepository.findByEmail(email);

        if (verification != null &&
                verification.getOtp().equals(otp)) {

            otpRepository.delete(verification);

            return true;
        }

        return false;
    }

    public void sendResult(String email, String result) {

        String messageText = "";

        if (result.equals("Consistent Learner")) {

            messageText = """
                Your Learning Type: Consistent Learner

                You have a relatively consistent approach to studying and tend to maintain your learning routine. Your biggest advantage is consistency, which can help you build knowledge gradually instead of relying only on last-minute preparation.

                Your strengths:
                - Regular study habits
                - Better revision consistency
                - Good ability to follow a routine
                - Usually completes planned tasks

                Tips for you:
                - Don't become too comfortable with your current routine.
                - Try different learning techniques such as active recall and practice questions.
                - Set slightly more challenging weekly goals.
                - Take regular breaks to avoid burnout.
                - Review difficult topics instead of repeatedly studying only familiar ones.

                Try this:
                At the end of every week, spend 15 minutes reviewing what you learned and identifying 2–3 topics that need more attention.
                """;

        } else if (result.equals("Needs Time Management")) {

            messageText = """
                Your Learning Type: Needs Better Time Management

                You may have enough motivation to study, but organizing your available time effectively can be challenging. A structured routine may help you turn your study time into more productive sessions.

                Your strengths:
                - You have the ability to improve quickly with structure.
                - You can benefit significantly from planning.
                - You may already have periods of productive study.

                Tips for you:
                - Plan tomorrow's tasks before going to sleep.
                - Break large assignments into smaller tasks.
                - Set a specific start and end time for studying.
                - Avoid trying to complete everything in one session.
                - Prioritize 2–3 important tasks instead of creating a huge to-do list.

                Try this:
                Use the 25–5 method: study for 25 minutes, take a 5-minute break, and repeat.
                """;

        } else if (result.equals("Easily Distracted")) {

            messageText = """
                Your Learning Type: Focus-Seeking Learner

                Your survey responses suggest that maintaining focus may be one of your biggest study challenges. Improving your study environment and reducing interruptions can make your study sessions more effective.

                Your strengths:
                - You may perform well when you are genuinely interested in a topic.
                - You can improve productivity significantly by controlling distractions.
                - Short, focused sessions may work well for you.

                Tips for you:
                - Keep your phone away while studying.
                - Turn off unnecessary notifications.
                - Study in a consistent location.
                - Use short focused study sessions.
                - Avoid switching between multiple subjects unnecessarily.
                - Keep a small paper/notepad nearby to write down distracting thoughts instead of acting on them.

                Try this:
                Start with just 20 minutes of distraction-free study. Gradually increase the duration as you become comfortable.
                """;

        } else if (result.equals("Last-Minute Learner")) {

            messageText = """
                Your Learning Type: Last-Minute Learner

                You may tend to become highly active when deadlines are close. While this can sometimes help you finish tasks quickly, starting earlier can give you more time for revision, practice, and understanding difficult topics.

                Your strengths:
                - You can work effectively under deadlines.
                - You may become highly focused when there is a clear target.
                - You are capable of completing tasks quickly when motivated.

                Tips for you:
                - Start with just 10–15 minutes instead of waiting for motivation.
                - Divide exam preparation into small daily targets.
                - Set your own deadlines before the actual deadline.
                - Use a checklist to track completed topics.
                - Leave the final few days for revision rather than learning everything from scratch.

                Try this:
                Use the "10-minute start": promise yourself that you'll study for only 10 minutes. Once you start, continuing usually becomes easier.
                """;
        }

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Your Learning Type");
        message.setText(messageText);

        mailSender.send(message);
    }
}