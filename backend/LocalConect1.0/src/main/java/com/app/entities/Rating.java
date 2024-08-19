package com.app.entities;

import javax.persistence.*;

@Entity
@Table(name = "rating")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rating_id")
    private Long ratingId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDetail user;

    @ManyToOne
    @JoinColumn(name = "service_provider_detail_id", nullable = false)
    private ServiceProvider serviceProviderDetail;

    @Column(name = "rating_value", nullable = false)
    private Integer ratingValue; // Rating value (e.g., 1 to 5)

    @Column(name = "comment", length = 255)
    private String comment; // Optional comment

    // Getters and Setters
    public Long getRatingId() {
        return ratingId;
    }

    public void setRatingId(Long ratingId) {
        this.ratingId = ratingId;
    }

    public UserDetail getUser() {
        return user;
    }

    public void setUser(UserDetail user) {
        this.user = user;
    }

    public ServiceProvider getServiceProviderDetail() {
        return serviceProviderDetail;
    }

    public void setServiceProviderDetail(ServiceProvider serviceProviderDetail) {
        this.serviceProviderDetail = serviceProviderDetail;
    }

    public Integer getRatingValue() {
        return ratingValue;
    }

    public void setRatingValue(Integer ratingValue) {
        this.ratingValue = ratingValue;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
